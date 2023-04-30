
const form=document.querySelector("#my-form");

const msg=document.querySelector('.msg');

const inputName = document.querySelector('#name');

const emailId=document.querySelector('#email');

const phone =document.querySelector('#phone');

const ul=document.querySelector('#users');

const axiosInstance = axios.create({ baseURL:'https://crudcrud.com/api/21316498fbee4392b39812b3998ae545'})
   



form.addEventListener('submit',onSubmit);

function onSubmit(e){

    e.preventDefault();
    
    if(inputName.value==='' || emailId.value==='' ||phone.value ==='' ){

        msg.classList.add("error");
        msg.innerHTML="please fill the fields";

        setTimeout(()=>msg.remove(),3000);
    }
    else{

        
        const li =document.createElement('li');
        //deletebutton
        const btn=document.createElement('button');
        //editbutton
        const editBtn =document.createElement('button');
        
        editBtn.innerHTML='Edit';


        li.appendChild(document.createTextNode(`${inputName.value} :${phone.value},`));
        li.appendChild(document.createTextNode(`${emailId.value}`))
        btn.innerHTML='Delete';
        btn.style.margin='0px 1rem';

      
        li.appendChild(btn);

        li.appendChild(editBtn);

        function showOnScreen(){

            ul.appendChild(li);
        }

        let myobj ={
            name:inputName.value,
            email:emailId.value,
            phone:phone.value,
        }
        //delete functinality
        btn.onclick= () =>{
            if(confirm('Are you sure')){
                
            // localStorage.removeItem(myobj.email);
            // axiosInstance.delete('/appoinmentData',)
            ul.removeChild(li);
            }
        
        //edit click function
        editBtn.onclick=()=>{
            localStorage.removeItem(myobj.email);
            ul.removeChild(li);

            inputName.value=myobj.name;
            emailId.value=myobj.email;
            phone.value =myobj.phone;

        }
    }
        axiosInstance.post('/appoinmentData',myobj)
        .then(response=>
            {   
                showOnScreen();
                console.log(response)})
        .catch(err=>console.log(err));

        // localStorage.setItem(emailId.value,JSON.stringify(myobj));

        inputName.value='';
        emailId.value='';
        phone.value ='';

    }

    

}






