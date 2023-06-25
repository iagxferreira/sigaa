import AsyncStorage from "@react-native-async-storage/async-storage";
import * as cheerio from "cheerio";
import parse from "node-html-parser";
import { Alert, Linking } from "react-native";
import { headerTarefa } from "../utils/headers";
import { api, payloadUser } from "./api";

export const baixaTarefa = async (
  json: any,
  form: string,
  javax: string,
  setLoading: any,
  navigation: any,
  setHtml: any,
  controller: any
) => {
  try {
    await AsyncStorage.setItem("back", "false");

    const parseJSON = JSON.parse(json.replace(/'/g, '"'));
    const payload = {
      ...parseJSON,
      "javax.faces.ViewState": javax,
    };
    payload[`${form}`] = form;
    setLoading(true);
    const response = await api.post(
      "/acesso-post",
      {
        url: "https://sig.ifsudestemg.edu.br/sigaa/ava/TarefaTurma/listar.jsf",
        headers: headerTarefa,
        data: payload,
        data2: await payloadUser(),
      },
      { signal: controller.signal }
    );
    setLoading(false);
    const $ = cheerio.load(response.data.content);
    const root = parse($.html());
    if (root.querySelector('a[title="Baixar Arquivo Enviado"]')) {
      const link = root.querySelector('a[title="Baixar Arquivo Enviado"]')
        ?.attributes.href;
      navigation.goBack();
      Linking.openURL(
        link?.includes("https://")
          ? link
          : "https://sig.ifsudestemg.edu.br" + link
      );
    } else if (
      root
        .querySelector("fieldset > ul.form > li")
        ?.textContent.includes("Resposta:")
    ) {
      setHtml(root);
    } else {
      if ((await AsyncStorage.getItem("back")) === "false") {
        navigation.goBack();
        Alert.alert(
          "Erro",
          "Erro ao carregar as tarefas, tente novamente mais tarde!"
        );
      }
      await AsyncStorage.setItem("back", "false");
    }
  } catch (e) {
    Alert.alert("Erro ao acessar a página!", "Tente novamente mais tarde!");
    navigation.goBack();
  }
};
