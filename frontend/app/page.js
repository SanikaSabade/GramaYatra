'use client';
import Header from "./components/Header";



export default function App({ children }) {
 

    return (
      <>
      <Headers></Headers>
        <main>{children}</main>
        
        
      </>
    );
  
  
}

// export default function HomePage() {
//   return (
  
//         <>
//         <Header></Header>
       
//         <LoginPage></LoginPage>
//         <Footer></Footer>
//         </>
     
//   );
// }


{/* <div className="p-12 text-center text-gray-800">
<h1 className="text-5xl font-bold mb-6">Welcome to GramaYatra</h1>
<p className="text-xl max-w-3xl mx-auto">
  Discover authentic rural experiences across India. Stay, learn, and grow with local communities.
  </p>
    </div> */}
