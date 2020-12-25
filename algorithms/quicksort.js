    const swap=(arrayList,lowerBound,upperBound) =>{
        const first = arrayList[lowerBound];
        const last = arrayList[upperBound];

        arrayList[lowerBound] = last;
        arrayList[upperBound] = first;

        return arrayList;
    }

    const partition =(arrayList,lowerBound,upperBound,animatedArray)=>{
        
        const pivot = arrayList[lowerBound];
        let start = lowerBound;
        let end = upperBound;

        // while start is less than end
        while (true) {
            while (start < arrayList.length && arrayList[start] <= pivot ) {
                start++;
                animatedArray.push({
                    p:lowerBound,
                    arr:[...arrayList],
                    comparision:[start, end],
                    swap:false
                })
            }
            while (end > 0 && arrayList[end] > pivot ) {
                end--;
                animatedArray.push({
                    p:lowerBound,
                    arr:[...arrayList],
                    comparision:[start, end],
                    swap:false

                })
            }

            if(start >= end){
                break;
            }
            else{
               swap(arrayList,start,end);
               animatedArray.push({
                p:lowerBound,
                arr:[...arrayList],
                comparision:[start, end],
                swap:true

            })
            }
        }
        swap(arrayList,lowerBound,end);
        animatedArray.push({
            p:lowerBound,
            arr:[...arrayList],
            comparision:[start, end],
            swap:true

        })
        return end;
    }
    const animatedArray=[];
    const QuickSort = (array,lowerBound,upperBound)=>{
        let loc;        
        if(lowerBound < upperBound){
            loc = partition(array, lowerBound, upperBound,animatedArray);
            QuickSort(array,lowerBound,loc-1);
            QuickSort(array,loc+1,upperBound);
        }

        return animatedArray
    }