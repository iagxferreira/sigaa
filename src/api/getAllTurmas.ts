import * as cheerio from "cheerio";
import { parse } from "node-html-parser";
import { api } from "./api";

export const getAllTurmas = async (
  setTurmasAnteriores: any,
  setLoading: any
) => {
  setLoading(true);
  const response = await api.post("/acesso-get", {
    url: "https://sig.ifsudestemg.edu.br/sigaa/portais/discente/turmas.jsf",
  });
  const $ = cheerio.load(response.data.content);
  const turmas = parse($.html());
  setLoading(false);
  setTurmasAnteriores(turmas);
};
