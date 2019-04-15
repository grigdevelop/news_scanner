class AsyncUtil{
    public static async forEach<T>(array : T[], callback: (T) => void){
        for (let index = 0; index < array.length; index++) {
            await callback(array[index]);
        }
    }
}

export { AsyncUtil }