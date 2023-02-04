import { spanWebScrape } from "./spanScrape";
import { wordWebScrape } from "./wordScrape";

export type span5Conj = {
	translation: string,
	presente: [string, string, string, string, string, string],// +
	presenteProgresivo: [string, string, string, string, string, string],// +
	preterito: six,
	imperfecto: [string, string, string, string, string, string],//+
	preteritePerfecto: [string, string, string, string, string, string],//presentePerfecto +
	pluscuamperfecto: [string, string, string, string, string, string],//pluscuamperfecto
	futuroInmediato: [string, string, string, string, string, string],// EEK ir a (verb)
	futuroSimple: [string, string, string, string, string, string],// +
	condicional: [string, string, string, string, string, string],// +
	presenteDeSubjuntivo: [string, string, string, string, string, string],//+
	preteritoPerfectoDelSubjuntivo: [string, string, string, string, string, string],// word ref
	imperfectoDelSubjuntivo: [string, string, string, string, string, string], // word ref
	pluscuamperfectoDelSubjuntivo: [string, string, string, string, string, string],// word ref
	afirmativo: [string, string, string, string, string, string],
	negativo: [string, string, string, string, string, string],
}

export type six = [string, string, string, string, string, string];

function createImediateFuture(verb: string): six {
	return [
		`voy a ${verb}`,
		`vas a ${verb}`,
		`va a ${verb}`,
		`vamos a ${verb}`,
		`vais a ${verb}`,
		`van a ${verb}`
	]
}

export async function fullScrape(verb: string): Promise<{success: true, spanDictTime: number, wordRefTime: number, data: span5Conj} | {success: false, reason: string}> {
	const wordRef = await wordWebScrape(verb);
	const spanDict = await spanWebScrape(verb);
	
	if (wordRef.success == false 
		|| spanDict.success == false
		|| typeof spanDict.spanConjugations?.presente == 'undefined'
		|| typeof spanDict.spanConjugations?.presenteProgresivo == 'undefined'
		// || spanDict.spanConjugations.presente.length != 6
	) return {
		success: false,
		reason: "word ref or span dict failed"
	}
	
	return {
		success: true,
		spanDictTime: spanDict.time ?? 0,
		wordRefTime: wordRef.time ?? 0,
		data: {
			presente: spanDict.spanConjugations.presente.splice(0, 6) as six,
			presenteProgresivo: spanDict.spanConjugations.presenteProgresivo.splice(0, 6) as six,
			preterito: spanDict.spanConjugations.preterito.splice(0, 6) as six,
			imperfecto: spanDict.spanConjugations.imperfecto.splice(0, 6) as six,
			preteritePerfecto: spanDict.spanConjugations.presentePerfecto.splice(0, 6) as six,
			pluscuamperfecto: spanDict.spanConjugations.pluscuamperfecto.splice(0, 6) as six,
			futuroInmediato: createImediateFuture(verb),
			futuroSimple: spanDict.spanConjugations.futuro.splice(0, 6) as six,
			condicional: spanDict.spanConjugations.condicional.splice(0, 6) as six,
			presenteDeSubjuntivo: spanDict.spanConjugations.presenteDeSubjuntivo.splice(0, 6) as six,
			preteritoPerfectoDelSubjuntivo: wordRef.data?.preteritoPerfectoDelSubjuntivo.splice(0, 6) as six,
			imperfectoDelSubjuntivo: wordRef.data?.imperfectoDelSubjuntivo.splice(0, 6) as six,
			pluscuamperfectoDelSubjuntivo: wordRef.data?.pluscuamperfectoDeSubjuntivo.splice(0, 6) as six,
			afirmativo: wordRef.data?.afirmativo.splice(0, 6) as six,
			negativo: wordRef.data?.negativo.splice(0, 6) as six,
			translation: spanDict.spanConjugations.translation[0] ?? ""
		}
	}
}