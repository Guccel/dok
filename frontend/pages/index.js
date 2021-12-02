import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <header>
      <div>
        <img src="../public/dok.svg" alt="" />
        <Link href="/">HOME</Link>
        <Link href="/about">ABOUT</Link>
        <Link href="/products">PRODUCTS</Link>
      </div>
    </header>
  )
}
