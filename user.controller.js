const UserModel = require("./user.model");
const fast2sms = require("fast-two-sms")

exports.register = async (req, res, next) => {
  try {
    const { name, phone } = req.body;

    const createUser = new UserModel({ name, phone });
    const successRes = await createUser.save();

    return res.json({
      status: true,
      data: successRes,
      message: "user registered",
    });
  } catch (error) {
    //console.log(error);
    return res.json({ status: false, data: [], message: "error: " + error });
  }
};

function generateOTP(length) {
  const charset = "0123456789";
  let OTP = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    OTP += charset[randomIndex];
  }

  return OTP;
}

exports.login = async (req, res, next) => {
  try {
    const {name, phone} = req.body;
    const user = await UserModel.find({phone});

    if(user.length){
      const user = await UserModel.find({name,phone});
        if(user.length){
          res.status(200).json({ status: true, success: user, message: "logged in"});
        }else{
          res.status(200).json({ status: true, success: false, message: "invalid credentials"})
        }
        
    }else{
    const otp = generateOTP(4);

    var options = {
      authorization:
        "rg8WWOptxs1zGmdYbtwicJsJGa7GFy2ftLUAWmWEKndeUiwEBCQO2k8OYEMw",
      message: "This is Verfification Code Message of Your OTP Code is: " + otp,
      numbers: [phone],
    };

    await fast2sms
      .sendMessage(options)
      .then((response) => {
        //console.log(response.message);
         res.status(200).json({
          status:false,
          success: true,
          data: { otp: otp },
          message: "user is unregistred and "+response.message[0],
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(205).json({
          success: false,
          error: err
        })
      });
      
    }

  } catch (error) {
    res.status(401).json({ status: false, message: "error: " + error });
    next(error);
  }
};



