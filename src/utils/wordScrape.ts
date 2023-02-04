// @ts-nocheck
import axios from "axios";
import { load } from "cheerio";
import { wordKinds, wordScrape } from "../../types/wordReferenceTypes";

export const wordWebScrape = async (verb: string) => {
	const page = `https://www.wordreference.com/conj/esverbs.aspx?v=${verb}`;
	const start =  Date.now();
	try {
      // get HTML from page
      const { data } = await axios.get(page);
      // load HTML into cheerio
      const $ = load(data);
      // find all html elements who have a parent of div, a grand parent of a, and so on
      const conjItems = $("table.neoConj tr td")
      // all conjugations (and translation) given by spandict
      const wordConjugations: wordScrape = {
        presente: [],
        imperfecto: [],
        preterito: [],
        futuro: [],
        condicional: [],
        preteritoPerfecto: [],
        pluscuamperfecto: [],
        futuroPerfecto: [],
        condicionalPerfecto: [],
        presenteDeSubjuntivo: [],
        imperfectoDelSubjuntivo: [],
        futuroDeSubjuntivo: [],
        preteritoPerfectoDelSubjuntivo: [],
        pluscuamperfectoDeSubjuntivo: [],
        badFuturoDeSubjuntivo: [],
        afirmativo: [],
        negativo: [],
        preteritoAnterior: [],
      }
      
    
      conjItems.each((index, item) => {
        if (wordConjugations[wordKinds[Math.floor(index/7)]].length !== 6) {
          wordConjugations[wordKinds[Math.floor(index/7)]].push($(item).text())
        }
      })

	let exists = false;
	for (const conj in wordConjugations) {
		const array = wordConjugations[conj as keyof wordScrape];
		if (array.length <= 5) {
			exists = true;
		}
	}
	if (exists) return {
		success: false,
		reason: "failed to scrape",
	}
		
	// console.log(wordConjugations);
    return {
		success: true,
		data: wordConjugations,
		time: Date.now() - start,
	}
    } catch (e) {
    	return {
			success: false,
			reason: e,
		}
  }
}