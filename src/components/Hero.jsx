import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import {motion} from "framer-motion"
import { styles } from "../styles"
import { ComputersCanvas } from "./canvas"
//text in the title page
const Hero = () => {
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [toxicStatus, setToxicStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleImageInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      const formData = new FormData();
      formData.append("file", file);

      setIsLoading(true);

      try {
        const response = await fetch('https://b5ef-2405-201-1b-6066-dd04-d761-680b-3e4.ngrok.io/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          if (result.response === 'Toxic') {
            setToxicStatus('toxic');
          } else if (result.response === 'Not Toxic') {
            setToxicStatus('non-toxic');
          } else {
            console.error('Invalid response from the server.');
          }
        } else {
          console.error('Image upload failed.');
        }
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full h-screen mx-auto">
    <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
    <div className="flex flex-col justify-center items-center mt-5">
    
    <div className={`w-5 h-5 rounded-full bg-${toxicStatus === 'toxic' ? 'red' : 'secondary'}`} />
          <div className={`w-1 sm:h-80 h-40 bg-gradient-to-tl from-[#EEE2DC] to-${toxicStatus === 'toxic' ? 'red' : 'primary'}`} />
        </div>
        <div >
          <h1 className={`${styles.heroHeadText} text-[#EEE2DC]`}>Chat <span className="text-[#444444] ">slur</span> detector</h1>
          {toxicStatus === 'toxic'
            ? (
              <>
                <p className={`${styles.heroSubText} mt-2 text-[#000000]`}>Oh No! The Text is Toxic</p>
              </>
            )
            : toxicStatus === 'non-toxic'
              ? (
                <>
                  <p className={`${styles.heroSubText} mt-2 text-[#000000]`}>No need to worry, The Text is Not Toxic</p>
                </>
              )
              : (
                <>
                  <p className={`${styles.heroSubText} mt-2 text-[#000000]`}>Want to know if the text is toxic or not?<br />Enter the image of the chat and get to know.</p>
                </>
              )
          }
          <div className="mt-2">
            <label htmlFor="imageInput" className="btn btn-3 hover-border-3" style={{ marginLeft: '2px' }}>
              <span>ADD IMAGE</span>
            </label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageInputChange}
            />
            {/* {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected Image"
                className={`mt-2 max-w-64 max-h-64 border-${toxicStatus === 'toxic' ? 'red' : 'green'}`}
              />
            )} */}
          </div>

        </div>
      </div>
      <Modal isOpen={isLoading} centered>
        <ModalHeader>Loading...</ModalHeader>
        {/* <div class="load-wrapp">
          <div class="load-3">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div> */}
      </Modal>
      {/* <ComputersCanvas /> */}

    {/* <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div> */}


    </section>
  )
}

export default Hero