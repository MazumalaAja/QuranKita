import "./app.css"

export default function Loading() {
     return (
          <div className="bg-gray-900/60 backdrop-blur-sm fixed z-9999 flex-col gap-2 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
               <div className="book">
                    <div className="book__pg-shadow"></div>
                    <div className="book__pg"></div>
                    <div className="book__pg book__pg--2"></div>
                    <div className="book__pg book__pg--3"></div>
                    <div className="book__pg book__pg--4"></div>
                    <div className="book__pg book__pg--5"></div>
               </div>
               <h2 className="text-2xl text-indigo-100">--- Loading ---</h2>
          </div>
     )
}