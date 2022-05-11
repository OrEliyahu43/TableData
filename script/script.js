const table = document.querySelector('table');


function dataFromURL(url) {
    fetch(url).then((response) => {
        return response.json()
    }
    ).then((data) => {
        return data

    });

}

const classData = dataFromURL('https://capsules-asb6.herokuapp.com/api/teacher/toam');

console.log(classData)



