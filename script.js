const bmiBtn = document.querySelector('.calculateBMI');

function showErrorMessage(error) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </symbol>
            <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
            </symbol>
            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </symbol>
        </svg>
        <div class="mt-3 alert alert-danger d-flex align-items-center" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            <div>
                ${error}
                </div>
        </div>`;

    if(document.querySelector('.alert')) {
        document.querySelector('.alert').remove();
    }
    document.querySelector('h2').style.display = 'none';
    document.querySelector('.result').style.display = 'none';
    document.querySelector('.calculateBMI').insertAdjacentElement('afterend', wrapper);
    window.scrollTo(0, document.querySelector(".calculateBMI").offsetTop);
}

function calculateBmi(height, weight) {
    return weight / (height*height);
}

function showResult(calculatedBmi, ft, inch, weight) {
    if(document.querySelector('.alert')) {
        document.querySelector('.alert').remove();
    }

    let healthMsg;
    if(calculatedBmi < 16) {
        healthMsg = '<span style="color: #FF0100">SEVERE THINNESS</span>';
        document.querySelector('#idx11').style.backgroundColor = '#FF3233';
        document.querySelector('#idx12').style.backgroundColor = '#FF0100';
    }
    else if(calculatedBmi >= 16 && calculatedBmi < 17) {
        healthMsg = '<span style="color: #F02B79">MODERATE THINNESS</span>';
        document.querySelector('#idx21').style.backgroundColor = '#F15497';
        document.querySelector('#idx22').style.backgroundColor = '#F02B79';
    } 
    else if(calculatedBmi >= 17 && calculatedBmi < 18.5) {
        healthMsg = '<span style="color: #F26623">MILD THINNESS</span>';
        document.querySelector('#idx31').style.backgroundColor = '#F6834F';
        document.querySelector('#idx32').style.backgroundColor = '#F26623';
    } 
    else if(calculatedBmi >= 18.5 && calculatedBmi < 25) {
        healthMsg = '<span style="color: #02BEFE">NORMAL</span>';
        document.querySelector('#idx41').style.backgroundColor = '#33CAFF';
        document.querySelector('#idx42').style.backgroundColor = '#02BEFE';
    }
    else if(calculatedBmi >= 25 && calculatedBmi < 30) {
        healthMsg = '<span style="color: #2FCE00">OVERWEIGHT</span>';
        document.querySelector('#idx51').style.backgroundColor = '#58D933';
        document.querySelector('#idx52').style.backgroundColor = '#2FCE00';
    } 
    else if(calculatedBmi >= 30 && calculatedBmi < 35) {
        healthMsg = '<span style="color: #F36523">OBESE CLASS I</span>';
        document.querySelector('#idx61').style.backgroundColor = '#F6834F';
        document.querySelector('#idx62').style.backgroundColor = '#F36523';
    } 
    else if(calculatedBmi >= 35 && calculatedBmi < 40) {
        healthMsg = '<span style="color: #EE2B7B">OBESE CLASS II</span>';
        document.querySelector('#idx71').style.backgroundColor = '#F15497';
        document.querySelector('#idx72').style.backgroundColor = '#EE2B7B';
    } 
    else {
        healthMsg = '<span style="color: #FF0000">OBESE CLASS III</span>';
        document.querySelector('#idx81').style.backgroundColor = '#FF3233';
        document.querySelector('#idx82').style.backgroundColor = '#FF0000';
    } 

    document.querySelector('#bmiInfo').innerHTML = `BMI: ${calculatedBmi.toFixed(2)} <br>
                                                    Height: ${ft}' ${inch}" &ensp; Weight: ${weight} Kg <br>
                                                    Health Condition: ${healthMsg}`;                                             
    
    document.querySelector('h2').style.display = 'block';
    document.querySelector('.result').style.display = 'block';
    window.scrollTo(0, document.querySelector(".result").offsetTop);
}

function clearTableColor() {
    for(let i=1; i<=8; i++) {
        for(let j=1; j<=2; j++) {
            document.querySelector(`#idx${i}${j}`).style.backgroundColor = '#fff';
        }
    }
}

bmiBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const hFeet = Number.parseFloat(document.querySelector(`[name="inputFeet"]`).value);
    const hInch = Number.parseFloat(document.querySelector(`[name="inputInch"]`).value);
    const heightInMeter = ((hFeet*12 + hInch) * 2.54) / 100;    // 1 Feet = 12", 1" = 2.54cm and 1m = 100cm
    const weightInKg = Number.parseFloat(document.querySelector(`[name="inputWeight"]`).value);

    clearTableColor();

    try {
        if(isNaN(hFeet) || isNaN(hInch) || isNaN(weightInKg)) throw 'Invalid Input';
        if(hFeet < 0 || hInch < 0) throw 'Height Cannot Be Negative';
        if(hFeet === 0 && hInch === 0) throw 'Height Cannot Be Zero'
        if(hInch > 11) throw 'Inch Cannot Be Greater Then 11';
        if(weightInKg < 0) throw 'Weight Cannot Be Negative';
        if(weightInKg === 0) throw 'Weight Cannot Be Zero';
    }
    catch(error) {
        showErrorMessage(error);
        return;
    }
    
    const getBmi = calculateBmi(heightInMeter, weightInKg);
    showResult(getBmi, hFeet, hInch, weightInKg);
});