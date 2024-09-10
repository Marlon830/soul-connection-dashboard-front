export type ZodiacSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';
type ZodiacElement = 'Fire' | 'Earth' | 'Air' | 'Water';

const zodiacElements: Record<ZodiacSign, ZodiacElement> = {
    'Aries': 'Fire',
    'Taurus': 'Earth',
    'Gemini': 'Air',
    'Cancer': 'Water',
    'Leo': 'Fire',
    'Virgo': 'Earth',
    'Libra': 'Air',
    'Scorpio': 'Water',
    'Sagittarius': 'Fire',
    'Capricorn': 'Earth',
    'Aquarius': 'Air',
    'Pisces': 'Water'
};

const elementsCompatibilityMatrix: Record<ZodiacElement, ZodiacElement[]> = {
    'Fire': ['Fire', 'Air'],
    'Earth': ['Earth', 'Water'],
    'Air': ['Air', 'Fire'],
    'Water': ['Water', 'Earth']
};


const zodiacCompatibility: Record<ZodiacSign, ZodiacSign[]> = {
    'Aries': ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
    'Taurus': ['Virgo', 'Capricorn', 'Pisces', 'Cancer'],
    'Gemini': ['Libra', 'Aquarius', 'Aries', 'Leo'],
    'Cancer': ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
    'Leo': ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
    'Virgo': ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
    'Libra': ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
    'Scorpio': ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
    'Sagittarius': ['Aries', 'Leo', 'Libra', 'Aquarius'],
    'Capricorn': ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
    'Aquarius': ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
    'Pisces': ['Cancer', 'Scorpio', 'Taurus', 'Capricorn']
};


const yinSigns: ZodiacSign[] = ['Taurus', 'Cancer', 'Virgo', 'Scorpio', 'Capricorn', 'Pisces'];
const yangSigns: ZodiacSign[] = ['Aries', 'Gemini', 'Leo', 'Libra', 'Sagittarius', 'Aquarius'];


function ElementaryCompatibility(zodiac1: ZodiacSign, zodiac2: ZodiacSign) {
    const element1 = zodiacElements[zodiac1];
    const element2 = zodiacElements[zodiac2];

    if (element1 === element2) {
        return 20;
    } else if (elementsCompatibilityMatrix[element1].includes(element2)) {
        return 15;
    }
    return -15;
}

function ZodiacCompatibility(zodiac1: ZodiacSign, zodiac2: ZodiacSign) {
    if (zodiacCompatibility[zodiac1].includes(zodiac2)) {
        return 10;
    } else {
        return -15;
    }
}

function YinYangCompatibility(zodiac1: ZodiacSign, zodiac2: ZodiacSign) {
    const iszodiac1Yin = yinSigns.includes(zodiac1);
    const iszodiac2Yin = yinSigns.includes(zodiac2);

    // Si un signe est Yin et l'autre est Yang, ils sont compatibles
    if ((iszodiac1Yin && !iszodiac2Yin) || (!iszodiac1Yin && iszodiac2Yin)) {
        return 20;
    }
    return -10;
}

export function checkCompatibility(zodiac1: ZodiacSign, zodiac2: ZodiacSign) {
    let compatibility = 50;

    compatibility += ElementaryCompatibility(zodiac1, zodiac2);
    compatibility += ZodiacCompatibility(zodiac1, zodiac2);
    compatibility += YinYangCompatibility(zodiac1, zodiac2);
    return compatibility;
}