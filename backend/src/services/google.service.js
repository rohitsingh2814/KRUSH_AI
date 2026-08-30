const {OAuth2Client, GoogleAuth}=require("google-auth-library");

const client=new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const verifyGoogleToken=async (token)=>{
    const ticket=await client.verifyIdToken({
        idToken:token,
        audience:process.env.GOOGLE_CLIENT_ID
    });

    const payload=ticket.getPayload();

    return{
        GoogleId:payload.sub,
        name:payload.name,
        email:payload.email,
        profileImage:payload.picture
    };
};

module.exports={
    verifyGoogleToken
};