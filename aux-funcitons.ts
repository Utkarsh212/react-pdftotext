const calculateStartLine = (controlPosX: {[key: string]: number}): number => {
 let vectorKeys = Object.keys(controlPosX);
    let moreUsualValue: {key:string, value: number} = {key:'', value: 0};

    vectorKeys.forEach(key => {
      if(controlPosX[key] > moreUsualValue.value){
        moreUsualValue = {
          key,
          value: controlPosX[key] as number
        }
      }
    })

   return (Number(moreUsualValue.key)+2)
}

export default calculateStartLine;