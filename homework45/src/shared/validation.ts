    export const required = (value : any) => (value ? undefined : 'Required');
    export const requiredSelect = (value : any) => (value ? undefined : 'Please select an option');
    export const mustBeNumber = (value : any) => (isNaN(value) ? 'Must be a number' : undefined);