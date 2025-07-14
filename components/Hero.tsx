'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  // Ref for the container of animated lines
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Select all elements with class 'line' inside heroRef
      gsap.fromTo(
        '.line',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.3, // each line appears one after another
        }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="flex items-center justify-center min-h-screen   px-6">
      <div ref={heroRef} className="max-w-3xl text-center space-y-4">
        <h1 className="text-5xl font-bold line">
          Welcome to My Awesome Website
        </h1>
        <p className="text-xl line">
          We create beautiful experiences with smooth animations.
        </p>
        <p className="text-lg line text-gray-400">
          Scroll down to explore more about what we do.
        </p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus quia quis, quidem mollitia sequi, reprehenderit ducimus harum adipisci alias aspernatur quas! Illo labore saepe debitis dolor amet? Nam eum placeat, eaque consectetur cum quaerat id incidunt porro culpa architecto fuga iusto harum. Mollitia nobis repudiandae minima. Earum aperiam exercitationem non saepe deserunt natus qui nihil possimus cupiditate tempore sed blanditiis, nulla tenetur nesciunt culpa, sequi atque ipsum et unde ipsam vel. Maxime dolorum nisi, earum, molestias obcaecati dolorem, doloribus nemo saepe consectetur tempora ab ad architecto fuga qui expedita provident sint. Voluptatem recusandae aperiam aspernatur odio quos magni eligendi amet.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, sequi hic! Hic, debitis quae. Dignissimos in provident sint corporis labore, nemo fuga quam optio quos! Aliquid modi sunt aperiam hic animi similique, tempora eos doloremque impedit error ut, iure libero accusantium eveniet ullam illo deleniti! Quo voluptas vitae maxime animi eos odio excepturi voluptatem, quas asperiores officiis et dolores hic natus eaque aperiam soluta consequatur? Tenetur consectetur autem quam incidunt nobis impedit, officiis ullam asperiores quo temporibus mollitia necessitatibus est, excepturi dolorum vero vel odio. Repellendus accusamus, quasi omnis dolores et, ea placeat assumenda autem eligendi incidunt dolorum repellat suscipit dignissimos dicta libero sed asperiores voluptatem dolorem. Ex magni neque consequuntur obcaecati adipisci, qui dolor modi tenetur error incidunt. Ratione temporibus quam maiores perspiciatis quisquam consequatur voluptatem quo minima neque non. Odio dolorem iste veniam, soluta atque enim? Iste, inventore incidunt! Similique debitis excepturi nostrum harum mollitia, cupiditate at distinctio asperiores quae maxime minima omnis iusto consequuntur quidem nihil accusamus numquam. Illo natus dolore rerum culpa nostrum eligendi est officia aliquid voluptas dicta, doloribus accusantium praesentium necessitatibus, non repellat nam ipsam quaerat porro adipisci! Voluptatem obcaecati, aliquid dolore saepe, beatae explicabo vel cum, laudantium consequuntur quis modi libero eius porro ipsum. Rerum optio excepturi provident eligendi officia amet repellat? Dicta sequi eveniet ullam, neque voluptate atque illum, perspiciatis ipsum dolore quaerat fuga magnam placeat saepe aliquid? Aperiam, assumenda! Enim vel accusamus illo qui provident obcaecati quia vitae, sed veniam perspiciatis quam similique sequi at temporibus culpa quae possimus! Ut voluptatibus necessitatibus corrupti dolorem impedit explicabo voluptate fugit architecto nam odit blanditiis voluptatem nobis, dolore animi doloribus vero atque amet sapiente sed, excepturi sint deleniti quisquam. Et ducimus doloribus eaque quo quaerat nobis officiis cum fuga molestias in itaque voluptatibus rerum veniam eos, ipsa nostrum praesentium, sint natus facere repellendus quia.
        
      </div>
    </main>
  )
}
