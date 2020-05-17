document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    const db = firebase.database();
    var no_locations_header = document.getElementById('no-location');
    var current_num_people_element = document.getElementById('curr-num');
    var total_num_people_element = document.getElementById('total-num');
    var location_name_element = document.getElementById('location-name');
    var location_card_element = document.getElementById('location-card');
    var advice_element = document.getElementById('advice');

    var usersRef = db.ref('users');
    usersRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            var is_active = childData.is_active;
            var location_name = childData.name;
            var current_num = childData.current_people;
            var max_num = childData.max_people;
            var total_num = childData.total_people;
            if (is_active){
                no_locations_header.textContent = '';
                location_card_element.removeAttribute("style");
                current_num_people_element.textContent = ('Currently, there are ' + current_num + ' people.');
                total_num_people_element.textContent = ('Today ' + total_num + ' people visited here.');;
                location_name_element.textContent = location_name;
                if(current_num > max_num){
                    advice_element.setAttribute('class', 'alert alert-danger');
                    advice_element.textContent = 'Currently, there are too many people. You should visit this location.';
                } else {
                    advice_element.setAttribute('class', 'alert alert-success');
                    advice_element.textContent = 'It looks like you can maintain your social distance in this location. Stay safe!';
                }
            }
            
        });
    });

});