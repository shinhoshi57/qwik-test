
import { component$, useContext, useSignal, useStore } from '@builder.io/qwik';
import { MyContext } from '~/routes/layout';


export default component$(() => {

  const state = useStore({

    affirmation: ""
  })

  const author = useSignal("")

  const data = useContext(MyContext)

  return (
    <div class="fixed top-0 left-0 w-screen h-screen bg-slate-900 p-4 flex flex-col gap-2">
      <p class="text-2xl fon t-semibold text-center">Add an affirmation</p>
      <input class="bg-transparent outline-none focus:outline-none text-sm sm:text.base p-2 rounded border border-sky-800 focus:border-sky-400 duration-200" placeholder='Enter affirmation' onInput$={(e) => { state.affirmation = e.target.value }}></input>
      <input class="bg-transparent outline-none focus:outline-none text-sm sm:text.base p-2 rounded border border-sky-800 focus:border-sky-400 duration-200" bind:value={author} placeholder='Author'></input>
      <button class="bg-sky-400  px-4 py-2 rounded ml-auto duration-200 hover:bg-sky-600" onClick$={() => {
        if (!author.value || !state.affirmation) {

          return
        }

        data.affirmations = [...data.affirmations, [state.affirmation, author.value]]
        localStorage.setItem('qwik-affirmations', JSON.stringify({affirmations: data.affirmations}))
        data.openModal = false;

      }}>Save</button>
      <div class="h-[1px] bg-sky-300 opacity-50"/>
      <div class="flex flex-col gap-1 overflow-scroll">
        {data.affirmations.map((affirmation, affIndex) => {

          return (
            <div key={affIndex} class="flex flex-col bg-[black] text-sm round p-2">
              <p>{affirmation[0]}</p>
              <p class="text-xs text-slate-300"><i>-{affirmation[1]}</i></p>
              <i onClick$={()=>{

                data.affirmations = data.affirmations.filter((element, elementIndex)=>{

                  return elementIndex !== affIndex
                })

              }} class="fa-solid fa-minus cursor-pointer hover:scale-125 duration-200"></i>
            </div>
          )
        })}
      </div>

    </div>
  );
}
);