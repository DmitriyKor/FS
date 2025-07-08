    export const required = value => (value ? undefined : 'Required');
    export const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined);