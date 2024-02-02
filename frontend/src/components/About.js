import React,{useEffect} from 'react'

function About({setSearchSection}) {

    useEffect(()=>{
        setSearchSection(false)
      })

    return (
<div className='pt-20 h-full min-h-screen flex justify-center items-center text-center bg-gray-100'>
  <div className="container mx-auto md:w-[70%] w-[80%] flex flex-col bg-white p-8 rounded-lg shadow-md">

    <div className="title text-4xl font-bold mb-4">About MemeGenerator</div>

    <div className="content flex flex-col space-y-6">

      <section className="usage">
        <div className="title text-2xl mb-2">How to Use?</div>
        <div className="content text-lg text-left bg-gray-200 p-4 rounded">
          This app provides a straightforward user interface. You can choose meme templates from the home section or create custom templates in the custom edit section. We've integrated with the <a href='https://memegen.link/' target='_blank' rel="noreferrer" className="text-blue-500 hover:underline"><b>MEMEGEN API</b></a> on the Home page to edit templates provided by MEMEGEN, which means there may be some limitations and occasional delays in customization.<br />
          <b>Note:</b> Some templates may not require both top and bottom text, so please be mindful when generating memes (<i>only one input or three inputs may be needed</i>). If a template requires three inputs, we recommend downloading it and using it in the custom edit section.<br />
          <b>Note:</b> You can fine-tune text placement in the custom edit section by adjusting the respective parameters from <i>0.10 to 0.99</i>.<br />
          <b>Disclaimer:</b> This app does not infringe on any user-provided images, and it is entirely <a href='https://github.com/Ansuman-07/Meme-Generator' target='_blank' rel="noreferrer" className="text-blue-500 hover:underline"><b>Open Source</b></a>.
        </div>
      </section>

      <section className="technologies">
        <div className="title text-2xl mb-2">Technologies Used</div>
        <div className="content text-lg text-left bg-gray-200 p-4 rounded">
          This app is built using <i>React JS</i>, a powerful JavaScript library, and styled with <i>Tailwind CSS</i>, a versatile CSS framework. It is designed to be responsive, ensuring a seamless experience across different devices. Additionally, the app is hosted on GitHub using gh-pages, making it easily accessible via a simple link, so you can use it from anywhere.
        </div>
      </section>

      <section className="contact">
        <div className="title text-2xl mb-2">Developer Contact</div>
        <div className="content text-lg text-left bg-gray-200 p-4 rounded">
          Hello! I'm <b>Ansuman</b>, the developer behind this Meme Generator app. If you have any questions, suggestions, or feedback, please feel free to reach out to me. I'm here to assist you and improve your experience with the app. You can contact me via the following methods:<br /><br />
          - <b>Email</b>: ansumanpanigrahi00p@gmail.com <br />
          - <b> <a href="https://github.com/Ansuman-07" className='text-blue-500 hover:underline'>GitHub</a></b>  <b><a className='text-blue-500 hover:underline' href="https://www.linkedin.com/in/ansuman-panigrahi-54890b244/">LinkedIn</a></b> <br />
          Don't hesitate to get in touch :) I'd love to hear from you!
        </div>
      </section>

    </div>

  </div>
</div>



    )
}

export default About