

import { collection, getDocs } from 'firebase/firestore'
import { useState } from 'react'

import { auth, db } from '../firebase'

const AllUsers = () => {
///状態関数
  const [test, setTest] = useState([]);

  getDocs(collection(db, "user"))
  .then(snapshot => {
    setTest(snapshot.docs.map((doc) =>doc.data()
    ))

  })
  .catch(err => {
    console.log(err.message)
})

return (
  <div className="msgs">
  {test.map(({photoURL, displayName,uid }) => (
    <div>
      <div>
        <img src={photoURL} alt="" />
        <p>{displayName}</p>
      </div>
    </div>
  ))}
</div>
  )
}

export default AllUsers
