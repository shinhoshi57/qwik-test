
import { component$, useContext, useSignal, useStore } from '@builder.io/qwik';
import { MyContext } from '~/routes/layout';


export default component$(() => {

  const state = useStore({

    affirmation: ""
  })

  const author = useSignal("")

  const data = useContext(MyContext)

  return (
    <div class="fixed top-0 left-0 w-screen h-screen bg-slate-900">
      <p>Add an affirmation</p>
      <input placeholder='Enter affirmation' onInput$={(e)=>{state.affirmation=e.target.value}}></input>
      <input bind:value={author} placeholder='Author'></input>
      <button onClick$={()=>{
          if(!author.value || !state.affirmation){

            return
          }

          data.affirmations=[...data.affirmations,[state.affirmation, author.value] ]

      }}>Save</button>
      <hr/>
      <div class="flex flex-col gap-1">
        {data.affirmations.map((affirmation, affIndex)=>{

          return(
            <div key={affIndex}>
              {affirmation[0]}
            </div>
          )
        })}
      </div>
    
    </div>
  );
}
);