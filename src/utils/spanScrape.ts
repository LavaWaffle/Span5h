// @ts-nocheck
import axios from "axios";
import { load } from "cheerio";
import { conjTypes, type spanishDict } from "../../types/spanishDictTypes";

export const spanWebScrape = async (verb: string) => {
	const start =  Date.now();
	try {
		const { data } = await axios.get(`https://www.spanishdict.com/conjugate/${verb}`);
		const $ = load(data);

		// find all html elements who have a parent of div, a grand parent of a, and so on
    const conjItems = $(".ex-tip div a div")
    // all conjugations (and translation) given by spandict
      
		
	  const spanConjugations: spanishDict = {
      presente: [],
      preterito: [],
      imperfecto: [],
      condicional: [],
      futuro: [],
      presenteDeSubjuntivo: [],
      imperfectoDelSubjuntivo: [],
      futuroDeSubjuntivo: [],
      afirmativo: [],
      negativo: [],
      presenteProgresivo: [],
      preteritoProgresivo: [],
      imperfectoProgresivo: [],
      condicionalProgresivo: [],
      futuroProgresivo: [],
      presentePerfecto: [],
      preteritoPerfecto: [],
      pluscuamperfecto: [],
      condicionalPerfecto: [],
      futuroPerfecto: [],
      preteritoPerfectoDelSubjuntivo: [],
      imperfectoPerfectoDelSubjuntivo: [],
      futuroPerfectoDelSubhuntivo: [],
      translation: [],
    }
    // get all keys of conjugations and store them in a list
      
    // loop through the conjItems and add them to conjugations
    conjItems.each((index, item) => {
      // first 30 items (presente, preterito, imperfecto, condicional, futura)
      if (index < 30) {
        spanConjugations[conjTypes[index % 5]].push($(item).text())
      } else 
      // next 18 items  (PDS, IDS, FDS)
      if (index < 48) {
        spanConjugations[conjTypes[5 + index % 3]].push($(item).text())
      } else
      // next 10 items (mandato +, mandato -) (yo doesn't exist for thess forms)
      if (index < 58) {
        spanConjugations[conjTypes[8 + index % 2]].push($(item).text())
      } else 
      // next 30 items (presPro, pretPro, impPro, condPro, futPro)
      if (index < 88) {
        spanConjugations[conjTypes[10 + (index+2) % 5]].push($(item).text())
      } else 
      // next 30 items (presPer, pretPer, impPer, condPer, futPer)
      if (index < 118) {
        spanConjugations[conjTypes[15 + (index+2) % 5]].push($(item).text())
      } else 
      // last 18 items (presPerSub, impPerSub, futPerSub)
      if (index < 136) {
        spanConjugations[conjTypes[20 + (index+2) % 3]].push($(item).text())
      }
    })

    // find all definitions
    for (let i = 1; i <= 5; i++) {
      // find HTML element with following details
      const element = $(`#quickdef${i}-es a`) 
      // get text from element
      const def: string = $(element[0]).text()

      // if text length is greater than 0
      if (def) {
        spanConjugations.translation.push(def)
      }
    }

		if (spanConjugations.presente.length <= 0) return {
			success: false,
			reason: "Scrape failed"
		}
		return {
			success: true,
			spanConjugations,
			time: Date.now() - start,
		};		
	} catch (e) {
		console.log('error: ' + e);
		return {
			success: false,
			reason: e
		}
	}
	
}