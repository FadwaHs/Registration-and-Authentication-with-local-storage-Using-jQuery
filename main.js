
// Hash function 
const cyrb53 = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};


function signup(e) {
    event.preventDefault();

      //get element with jquery
      var email = $("#email").val();
      var name = $("#name").val();
      var password = $("#password").val();

    let passenc = cyrb53(password);

    var user = {
        email: email,
        name: name,
        password: passenc,
    };

    var json = JSON.stringify(user);
    localStorage.setItem(email, json);
    console.log('user aded');
    console.log(json);
}

function login(e) {
    
    event.preventDefault();

      //get element with jquery
      var email = $("#email").val();
      var password = $("#password").val();

      let passenc = cyrb53(password);

    var user = localStorage.getItem(email);
    var data = JSON.parse(user);
    console.log(data);


    if (user == null) {
        alert('wrong email');
    } else if (email == data.email && passenc == data.password) {
        alert('Logged in');
    } else {
        alert('wrong password');
    }
}