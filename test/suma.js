const suma=(...args)=>{
    if(!args.length){
        return 0
    }

    if(args.some((number =>typeof number!=='number'))){
        return null
    }
    return args.reduce((acc,number)=>acc +number,0)
}
export default suma 