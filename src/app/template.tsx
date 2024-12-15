'use client';
import { motion } from "motion/react"
import React from "react"

interface PageTransitionProps {
    children: React.ReactNode
}



const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
        >
            {children}
        </motion.div>
    )
}

export default PageTransition
