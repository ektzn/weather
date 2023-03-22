const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const weatherApiCall = async (lat, lng) => {
    let apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`).then(response=>{
        if(response.ok) {
            return response.json();
        }
        throw new Error('request failed')
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
        return jsonResponse;
    })

    const temp = () => {
        let tempInC = Math.round(apiCall.main.temp);
        let tempInCMax = Math.round(apiCall.main.temp_max);
        let tempInCMin = Math.round(apiCall.main.temp_min);
        return [tempInC, tempInCMin, tempInCMax]
    }

    const wind = () => {
        switch (true) {
            case (apiCall.wind.speed<=0.5):
                return ("Calm");
            case (0.5<apiCall.wind.speed && apiCall.wind.speed<=2):
                return ("Light air");
            case (2<apiCall.wind.speed && apiCall.wind.speed<=3):
                return("Light breeze");
            case (3<apiCall.wind.speed && apiCall.wind.speed<=5):
                return("Gentle breeze");
            case (5<apiCall.wind.speed && apiCall.wind.speed<=8):
                return("Moderate breeze");
            case (8<apiCall.wind.speed && apiCall.wind.speed<=10.5):
                return("Fresh breeze");
            case (10.5<apiCall.wind.speed && apiCall.wind.speed<=13.5):
                return("Strong breeze");
            case (13.5<apiCall.wind.speed && apiCall.wind.speed<=16.5):
                return("Moderate gale");
            case (16.5<apiCall.wind.speed && apiCall.wind.speed<=20):
                return("Fresh gale");
            case (20<apiCall.wind.speed && apiCall.wind.speed<=23.5):
                return("Strong gale");
            case (23.5<apiCall.wind.speed && apiCall.wind.speed<=27.5):
                return("Whole gale");
            case (27.5<apiCall.wind.speed && apiCall.wind.speed<=32):
                return("Storm");
            case (32<apiCall.wind.speed && apiCall.wind.speed):
                return("Hurricane");
        }
    }

    const pressure = () => {
        let pressureInMmHg = Math.round(apiCall.main.pressure/1.333);
        return pressureInMmHg;
    }

    const visibility = () => {
        let visabilityInKm = Math.round(apiCall.visibility/1000)
        return visabilityInKm;
    }

    return {
        id: apiCall.id,
        city: apiCall.name,
        country: apiCall.sys.country,
        icon: `http://openweathermap.org/img/wn/${apiCall.weather[0].icon}@2x.png`,
        state: apiCall.weather[0].main,
        wind: wind(),
        temp: temp()[0],
        min_temp: temp()[1],
        max_temp: temp()[2],
        humidity: apiCall.main.humidity,
        pressure: pressure(),
        visibility: visibility()
    };
}

export default weatherApiCall;
