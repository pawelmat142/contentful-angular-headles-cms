import { definePreset } from "@primeng/themes";
import Aura from '@primeng/themes/aura';

export const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{indigo.50}',    // Lightest shade
            100: '{indigo.100}',  // Slightly darker
            200: '{indigo.200}',
            300: '{indigo.300}',
            400: '{indigo.400}',
            500: '{indigo.500}',  // Default color
            600: '{indigo.600}',
            700: '{indigo.700}',
            800: '{indigo.800}',
            900: '{indigo.900}',  // Darkest shade
            950: '{indigo.950}'   // Extra-dark shade (for accents)
        },
        background: {
            default: '{gray.50}',  // Light background color
        },
        surface: {
            default: '{white}'     // Surface color
        },
        text: {
            primary: '{gray.900}', // Primary text color (dark for readability)
            secondary: '{gray.700}', // Secondary text color
            disabled: '{gray.500}'  // Disabled text color
        },
        // You can define more semantic color properties here
    }
});
