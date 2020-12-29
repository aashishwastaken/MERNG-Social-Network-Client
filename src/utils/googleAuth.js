import React, { useContext, useState } from 'react'
import * as queryString from 'query-string';
import { AuthContext } from '../context/auth';
import { gql, useMutation } from '@apollo/client';
import { Image, Loader, Segment } from 'semantic-ui-react'




// function parseUrl(urlParams){

//         console.log(`An error occurred: ${urlParams.error}`);
//       //return (<div>ERROR</div>);

// }

const GOOGLE_LOGIN = gql`
mutation googleLogin($code:String!){
    googleLogin(code:$code){
        id
        username
        email
        token
        createdAt
        picture

    }
}
`;

async function Br(props, context) {
    //console.log('b')
   
    const urlParams = queryString.parse(window.location.search);
    const code = urlParams.error ? console.log(`An error occurred: ${urlParams.error}`) : urlParams.code;
    let [values] = useState({ code });
    const [checkUser] = useMutation(GOOGLE_LOGIN, {
        update(proxy, results) {
            //console.log(x++);
            context.login(results.data.googleLogin);
            props.history.push("/");
        },
        onError(err) {
            console.warn(err);
        },
        variables: values
    });

    function clbck() {
        checkUser();
    }

    try {
        setTimeout(function () {       
            clbck();
        },5000);
        

        //console.log(userData);

    }
    catch (err) {
        console.warn(`the warn is:${err}`);
    }
    //  console.log(`The code is: ${urlParams.code}`);

}




export default function GoogleAuth(props) {
    let context = useContext(AuthContext);
    //console.log('i am running outside loop');

        //console.log('i am running in loop');

        Br(props, context);
    
    return (
        <Segment >
    <Loader active  />

    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
  </Segment>
    )
}


