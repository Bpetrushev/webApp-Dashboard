const traffic = document.getElementById('traffic');

Chart.defaults.scale.ticks.beginAtZero = true;
Chart.defaults.global.legend.display = false;

let data_traffic_chart = {
    hourly: [1300, 1200, 1300, 1200, 1300, 1200, 1400, 500, 600, 700, 200, 100, 200],
    daily: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300],
    weekly: [300, 720, 600, 220, 1500, 3000, 3000, 1000, 300, 200, 405, 1000, 2250],
    monthly: [0, 750, 1250, 900, 1500, 2000, 1500, 1750, 1250, 1750, 2250, 1750, 2250]
}

let traffic_chart = new Chart(traffic, {
    type: 'line',
    data: {
        labels: ['','16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
        datasets: [{
            label: 'Traffic',
            fill: true,
            data: data_traffic_chart['monthly'],
            backgroundColor: ['rgba(115, 119, 191, 0.3)'],
            borderColor: ['rgba(115, 119, 191, 1)'],
            borderWidth: 1,
            pointRadius: 5,
            pointBorderColor: 'rgba(115, 119, 191, 1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 6,
            pointHoverBorderWidth: 3,
            lineTension: 0.1
        }]
    }, 
    options: {
        responsive: true, 
        maintainAspectRatio: false
    }     
});
const daily_traffic = document.getElementById('daily_traffic');
let daily_traffic_chart = new Chart(daily_traffic, {
    type: 'bar',
    data: {
        labels: ['S','M', 'T', 'W', 'T', 'F', 'S'],
        datasets: [
            {
                label: 'Daily Traffic',
                backgroundColor: '#7377bf',
                data: [300, 450, 650, 500, 800, 900, 400]
            }
        ]
    }  
});

const mobile_users = document.getElementById('mobile-users');
let mobile_users_chart = new Chart(mobile_users, {
    type: 'doughnut',
    data: {
       labels: ['Phones', 'Tablets', 'Desktop'],
       datasets: [
           {
               label: 'MOBILE USERS',
               backgroundColor: ['rgb(115, 177, 191)', 'rgb(129, 201, 143)', 'rgb(115, 119, 191)'],
               data: [50, 50, 400]
           }
       ] 
    },
    options: {
        legend: {
          display: true
        }
    }
});

//Change data in traffic chart
function removeData(chart, timeline) {
    chart.data.datasets[0].data = data_traffic_chart[timeline];
    chart.update();
}

//open dropdown on click ring bell
const ring_bell = document.querySelector('.ring-bell');
ring_bell.addEventListener('click', () => {
    document.querySelector('.notification-green-circle').style.display = 'none';
    let dropdown_list = document.querySelector('.dropdown-lists');

    if(dropdown_list.style.display === 'none' || dropdown_list.style.display === ''){
        dropdown_list.style.display = 'block';
    } else {
        dropdown_list.style.display = 'none';
    }

});

//delete list from dropdown ring bell
const delete_list_button = document.querySelectorAll('.dropdown-list-delete');
for(let i=0; i<delete_list_button.length; i++){
    delete_list_button[i].addEventListener('click', (e) => {
        e.target.parentElement.remove();
    });
}


//traffic chart timeline
const traffic_chart_nav_timeline = document.querySelectorAll('.traffic_chart_nav_timeline span');
for(let i=0; i<traffic_chart_nav_timeline.length; i++){
traffic_chart_nav_timeline[i].addEventListener('click', (e) => {
    traffic_chart_nav_timeline.forEach((x) => x.classList.remove('active'));
    e.target.className = 'active';
    removeData(traffic_chart, e.target.textContent.toLowerCase());
});
}


//action for menu icon
const menu = document.querySelector('.menu');
const resize_charts = () => {
    traffic_chart.resize();
    daily_traffic_chart.resize();
    mobile_users_chart.resize();
}

const menu_effect = (check, menu) => {
    if(check){
        let left = -64;
        for(let i=1; i<=10; i+=1){
            setTimeout( () => {
                left +=6.4;
                menu.style.left = `${left}px`;
            }, `${(i/2)*10}0`);
        }
    } else {
        let left = 0;
        for(let i=1; i<=10; i+=1){
            setTimeout( () => {
                left -=6.4;
                menu.style.left = `${left}px`;
            }, `${(i/2)*10}0`);
        }  
    }
}

menu.addEventListener('click', () => {
    const sidebarNav = document.querySelector('.sidebarNav');
    const mainContent = document.querySelector('.mainContent');
    if(sidebarNav.style.left == '' || sidebarNav.style.left == '-64px'){
        mainContent.style.width = `${window.innerWidth-75}px`;
        resize_charts();
        mainContent.style.marginRight = '0';
        menu_effect(true, sidebarNav);
    } else {
        menu_effect(false, sidebarNav);
        mainContent.style.width = ``;
        mainContent.style.marginRight =``;
        resize_charts();
    }
});

const sidebarNav = document.querySelector('.sidebarNav');
sidebarNav.addEventListener('click', (e) => {
    if(e.target.tagName === "IMG"){
        const all_buttons_sidebar = document.querySelectorAll('.sidebarNav a');
        all_buttons_sidebar.forEach((x) => {
            x.classList.remove('active');
            x.children[0].classList.remove('active');
        });
        e.target.parentElement.classList.add('active');
        e.target.previousElementSibling.classList.add('active');
    }
});

//alert 
const alert = document.querySelector('.alert');
alert.addEventListener('click', (e) => {
    if(e.target.tagName === 'IMG'){
        alert.style.display = 'none';
    }   
});

setTimeout(() => {
    alert.style.display = 'flex';
    let opacity = 0;
    for (let i = 0; i <= 10; i++) {
        (function(n) {
            setTimeout(function(){
                opacity = n/10;
                alert.style.opacity = opacity;
            }, `${n}00`);
        }(i));
    }
}, 3000);


