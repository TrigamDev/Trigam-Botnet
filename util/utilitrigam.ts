export default {
    randomElement: (array: any[], seed: string) => {
        let random = Math.floor(Math.random() * array.length);
        return array[random];
    }
}