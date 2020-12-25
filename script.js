(()=>{
		let SPEED = 10;
		const startBtn = document.querySelector('#startVisulationBtn');
    const slowSpeed = document.querySelector('#slowSpeed');
		const fastSpeed = document.querySelector('#fastSpeed');
		const randomNumbersBtn = document.querySelector('.randomNumbersBtn');
		const resetBtn = document.querySelector('#resetBtn');
		const nOfComparision = document.querySelector('#nOfComparision');
		const nOfSwap = document.querySelector('#nOfSwap');
		const resetInfoDiv = document.querySelector('.reset-info');

		
		

		
		fastSpeed.addEventListener('click',(e)=>{
			SPEED = 1;
			slowSpeed.classList.remove('active');
			fastSpeed.classList.add('active');
		});
		slowSpeed.addEventListener('click',()=>{
			SPEED = 100;
			fastSpeed.classList.remove('active');
			slowSpeed.classList.add('active');

		});

    const grid = document.querySelector('.grid');
    const numberOfRows = 45;
    const numberOfColumns=90;
    for(let i=0;i<numberOfRows;i++){
        const row = document.createElement('div');
        row.className='gridRow'
        for(let j=0;j<numberOfColumns;j++){
            const cell = document.createElement('span');
            cell.className='cell'
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }

    // Generate 10 random number for sorting.
    const randomNumbers = [];
    const numberOFRandNumbers = 350;
    const min = 1;
		const max=540;
		
		for(let i=0;i<numberOFRandNumbers;i++){
			const num = Math.floor(Math.random()*(max-min + 1)) + min;
			if(num < min || num > max){
					i=i-1;
			}else{
					randomNumbers.push(num);
			}
	}
	
	const randomNumbersDiv = document.querySelector('.randomNumbers');
	randomNumbersDiv.className="randomNumbers"
	randomNumbersDiv.innerHTML=randomNumbers.join(' , ');

	const visualizationContainer = document.querySelector('.visualizationContainer');
	const visualizationWrapper = document.createElement('div');
	visualizationWrapper.className = 'visualizationWrapper';

	for(let i=0;i<randomNumbers.length;i++){
			const line = document.createElement('div');
			line.className='visualLine';
			line.style.height=randomNumbers[i]*1+'px';
			visualizationWrapper.appendChild(line);
	}

	visualizationContainer.appendChild(visualizationWrapper);

		const vertLines = document.getElementsByClassName('visualLine');

		const resetRandomNums =()=>{
			randomNumbers.length = 0;
			for(let i=0;i<numberOFRandNumbers;i++){
        const num = Math.floor(Math.random()*(max-min + 1)) + min;
        if(num < min || num > max){
            i=i-1;
        }else{
            randomNumbers.push(num);
					}
			}
			randomNumbersDiv.innerHTML=randomNumbers.join(' , ');

			for(let i=0;i<randomNumbers.length;i++){
				vertLines[i].style.height = randomNumbers[i]*1+'px';
				vertLines[i].style.backgroundColor = '#15db95';

			}

			visualizationContainer.appendChild(visualizationWrapper);
		}
		randomNumbersBtn.addEventListener('click',resetRandomNums);



    
    const handleAnimation= () =>{
			startBtn.setAttribute('disabled', true);
			slowSpeed.setAttribute('disabled', true);
			fastSpeed.setAttribute('disabled', true);
			randomNumbersBtn.setAttribute('disabled', true);

			const sortAnimation = QuickSort(randomNumbers,0,randomNumbers.length-1);
			
			const totalSwap = () =>{
				const x = sortAnimation.filter(s=>s.swap);
				return x.length;
			}
			const totalComparision = () =>{
				const x = sortAnimation.filter(c=>!c.swap);
				return x.length;
			}

			for(let a=0; a < sortAnimation.length;a++){
				const p = sortAnimation[a].p;
				const array = sortAnimation[a].arr;
				const comp = sortAnimation[a].comparision;

				setTimeout(()=>{
					for(let i = 0; i < vertLines.length  ; i++){
						let color = comp.includes(i) ? 'yellow' : p!==i ? i < p? 'pink': '#15db95' : 'green';
						if(a === sortAnimation.length-1){
							color = 'pink';
							resetInfoDiv.style.display = 'block';
							nOfSwap.innerHTML =`Total Swap's = ${totalSwap()}`
							nOfComparision.innerHTML =`Total Comparisions's = ${totalComparision()}<br/> Total Numbers = ${randomNumbers.length} `

						}
						vertLines[i].style.height = array[i]*1+'px';
						vertLines[i].style.backgroundColor = color;


						randomNumbersDiv.innerHTML=array.join(' , ');
					
					}
				},SPEED* a);
			}
			
    }
    
		startBtn.addEventListener('click',handleAnimation);
		resetBtn.addEventListener('click',()=>{
		window.location.reload();
		})
    
})();