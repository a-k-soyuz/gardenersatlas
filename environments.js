// Gardener's Atlas: Environment register

const environments = {

    e0001: {
    id: 'e0001',
    name: 'Bog Garden Paths',
    description: '',
    image: 'e0001-boggardenpaths.jpg',
    sound: 'sounds/e0001-birds-castlewellan-june-2025.m4a',

    layers: [
    {
        id: 'e0001-l0001',
        image: 'layers/e0001-l0001-sprayer.png',
        x: 78,
        y: 52.5,
        width: 7.0,
        target: 'e0002'
    },

    {
    id: 'e0001-l0002',
    image: 'images/alert-phone.png',
    x: 5,
    y: 70,
    width: 18,
    type: 'phone',

    screen: {
        date: 'JULY 2026',
        temperature: '15°C',
        conditions: 'SUN + CLOUD · DRY'
    }
}
]
},

    e0002: {
    id: 'e0002',
    name: 'Spring Garden',
    description: '',
    image: 'e0002-springgarden.jpg',
    sound: 'sounds/e0002-hustler-spring-garden-2025.m4a',

    layers: [

    // Animated lawnmower layer — behind the phone

    {
        id: 'e0002-l0002',
        image: 'layers/e0002-l0002-lawnmower.png',
        x: 35,
        y: 65,
        width: 14
    },

    // Phone layer — displayed above the lawnmower

    {
        id: 'e0002-l0001',
        image: 'images/alert-phone.png',
        x: 5,
        y: 70,
        width: 18,
        type: 'phone',

        screen: {
            date: 'August 2025',
            temperature: '18°C',
            conditions: 'SUN · DRY'
        }
    }

]
}
};