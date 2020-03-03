export const handlePerformanceItems=(data,fn)=>{
    let type=[...new Set(data.map(item=>item.typeName))];
    let performItems=[];
    for(let i=0;i<type.length;i++){
        let item={
            name:type[i],
            item:data.map(fn).filter(item=>(item.typeName==type[i]))
        }
        performItems.push(item);
    }
    return performItems;
}