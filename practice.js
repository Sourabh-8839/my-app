
const form = document.querySelector("#my-form");

const msg = document.querySelector('.msg');

const inputName = document.querySelector('#name');

const emailId = document.querySelector('#email');

const phone = document.querySelector('#phone');

const userList = document.querySelector('#users');

const axiosInstance = axios.create({ baseURL: 'https://crudcrud.com/api/ece94eb110c34e43b265cc354d9861f4' })


let myobj = {
    name: inputName.value,
    email: emailId.value,
    phone: phone.value,
}


form.addEventListener('submit', onSubmit);

window.addEventListener('DOMContentLoaded',()=>{
    axiosInstance.get('/appoinmentData')
    .then((res)=>{

        for(let i =0;i<res.data.length;i++){
        showOnScreen(res.data[i]);
        }
        console.log(res);
    })
    .catch(err=>console.log(err));
});

function onSubmit(e) {

    e.preventDefault();

    if (inputName.value === '' || emailId.value === '' || phone.value === '') {

        msg.classList.add("error");
        msg.innerHTML = "please fill the fields";

        setTimeout(() => msg.remove(), 3000);
    }
    else { 
            axiosInstance.post('/appoinmentData', myobj)
                .then((response) => {
                    showOnScreen(myobj);
                    console.log(response)
                })
                .catch((err) => console.log(err));

            // localStorage.setItem(emailId.value,JSON.stringify(myobj));

            inputName.value = '';
            emailId.value = '';
            phone.value = '';

        }
    }



function showOnScreen(myobj) {

    console.log(myobj.name);
      
    const li =document.createElement('li');
    //deletebutton
    const btn=document.createElement('button');
    //editbutton
    const editBtn =document.createElement('button');
    
    editBtn.innerHTML='Edit';


    li.appendChild(document.createTextNode(`${myobj.name} :${myobj.phone},`));
    li.appendChild(document.createTextNode(`${myobj.email}`))
    btn.innerHTML='Delete';
    btn.style.margin='0px 1rem';

  
    li.appendChild(btn);

    li.appendChild(editBtn);

    userList.appendChild(li);

     //delete functinality
     btn.onclick= () =>{
        if(confirm('Are you sure')){
            
        // localStorage.removeItem(myobj.email);
        // axiosInstance.delete('/appoinmentData',)
        userList.removeChild(li);
        }
    
    //edit click function
    editBtn.onclick=()=>{
        localStorage.removeItem(myobj.email);
        userList.removeChild(li);

        inputName.value=myobj.name;
        emailId.value=myobj.email;
        phone.value =myobj.phone;

    }
}
}







