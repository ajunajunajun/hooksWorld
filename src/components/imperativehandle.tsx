import React, { useImperativeHandle, forwardRef, useRef } from 'react'

type Props = {}

export interface Handler {
  setWaaaai(): void
}

const MyInput = (props: Props, ref: any) => {
  const myInputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => ({
    setWaaaai() {
      if (myInputRef && myInputRef.current) {
        myInputRef.current.value = 'Waaaaai'
      }
    }
  }))

  return <input type="text" ref={myInputRef} />
}

export default forwardRef(MyInput)
