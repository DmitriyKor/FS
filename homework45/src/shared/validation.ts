    export const required = value => (value ? undefined : 'Required');
    export const requiredSelect = value => (value ? undefined : 'Please select an option');
    export const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined);