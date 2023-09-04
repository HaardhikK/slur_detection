import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Tilt from "react-parallax-tilt";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

// template_s08afcs
// service_z90teul
//A6anh6rotbEDhO7Nr

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_z90teul',
        'template_s08afcs',
        {
          from_name: form.name,
          to_name: "Haardhik Kunder",
          from_email: form.email,
          to_email: "kunderhaardhik@gmail.com",
          message: form.message,
        },
        'A6anh6rotbEDhO7Nr'
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div
      className={`xl:mt-10 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div >
  <Tilt
    options={{
      max: 45,
      scale: 1,
      speed: 450,
    }}
    className='bg-[#111111] p-5 rounded-2xl sm:w-[560px] w-full'
  >
    <div className='relative w-full h-[530px]'>
      {/* <img
        src={image}
        alt='project_image'
        className='w-full h-full object-cover rounded-2xl'
      /> */}

      <div className='absolute inset-0 flex justify-end m-3 card-img_hover gap-2'>
        <div
          // onClick={() => window.open(source_code_link, "_blank")}
          className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
        >
          {/* <img
            src={reactjs}
            alt='source code'
            className='w-1/2 h-1/2 object-contain'
          /> */}
        </div>
        
      </div>
    </div>

    <div className='mt-5'>
      <h3 className='text-[#ede1be] font-bold text-[24px]'>husndc</h3>
      <p className='mt-2 text-secondary text-[14px]'>sdcds kcjdc</p>
    </div>

    <div className='mt-4 flex flex-wrap gap-2'>
      
        <p className={`text-[14px] `}
        >
          sadcslc,d;slc,
        </p>
     
    </div>
  </Tilt>
</motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[350px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");