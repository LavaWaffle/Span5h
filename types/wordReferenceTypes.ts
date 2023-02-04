export type wordScrape = {
	presente: string[],
	imperfecto: string[],
	preterito: string[],
	futuro: string[],
	condicional: string[],
	preteritoPerfecto: string[],
	pluscuamperfecto: string[],
	futuroPerfecto: string[],
	condicionalPerfecto: string[],
	presenteDeSubjuntivo: string[],
	imperfectoDelSubjuntivo: string[],
	futuroDeSubjuntivo: string[],
	preteritoPerfectoDelSubjuntivo: string[],
	pluscuamperfectoDeSubjuntivo: string[],
	badFuturoDeSubjuntivo: string[],
	afirmativo: string[],
	negativo: string[],
	preteritoAnterior: string[],
}

export type wordKey = "presente" |
	"imperfecto" |
	"preterito" |
	"futuro" |
	"condicional" |
	"preteritoPerfecto" |
	"pluscuamperfecto" |
	"futuroPerfecto" |
	"condicionalPerfecto" |
	"presenteDeSubjuntivo" |
	"imperfectoDelSubjuntivo" |
	"futuroDeSubjuntivo" |
	"preteritoPerfectoDelSubjuntivo" |
	"pluscuamperfectoDeSubjuntivo" |
	"badFuturoDeSubjuntivo" |
	"afirmativo" |
	"negativo" |
	"preteritoAnterior"

export const wordKinds: wordKey[] = ["presente",
	"imperfecto",
	"preterito",
	"futuro",
	"condicional",
	"preteritoPerfecto",
	"pluscuamperfecto",
	"futuroPerfecto",
	"condicionalPerfecto",
	"presenteDeSubjuntivo",
	"imperfectoDelSubjuntivo",
	"futuroDeSubjuntivo",
	"preteritoPerfectoDelSubjuntivo",
	"pluscuamperfectoDeSubjuntivo",
	"badFuturoDeSubjuntivo",
	"afirmativo",
	"negativo",
	"preteritoAnterior"]