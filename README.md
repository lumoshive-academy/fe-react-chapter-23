# React Hook: useRef

`useRef` adalah Hook di React yang memungkinkan kita membuat referensi yang dapat disimpan antar render. Ini sering digunakan untuk mengakses atau memodifikasi elemen DOM secara langsung atau untuk menyimpan nilai yang tidak memicu render ulang komponen saat diperbarui.

## Contoh Penggunaan `useRef` untuk Mengakses Elemen Input

Dalam contoh ini, `useRef` digunakan untuk membuat referensi ke elemen input. Setelah komponen di-mount, kita dapat mengakses nilai input melalui referensi tersebut.

### Kode

```javascript
import React, { useRef, useEffect } from "react";

export default function App() {
  // 1. Membuat referensi untuk elemen input
  const inputRef = useRef(null);

  useEffect(() => {
    // 2. Mengakses nilai awal dari input saat komponen pertama kali di-render
    console.log(inputRef.current.value);
  }, []); // Efek ini hanya dijalankan sekali saat komponen di-mount

  return <input ref={inputRef} type="text" />;
}
```
### Penjelasan
- useRef(null): inputRef adalah referensi yang dibuat menggunakan useRef. Referensi ini awalnya null, tetapi akan diperbarui untuk menunjuk ke elemen input setelah elemen itu dirender.
- ref={inputRef}: Pada elemen <input>, kita menetapkan ref ke inputRef. Ini memungkinkan inputRef untuk "mereferensikan" elemen DOM input sehingga kita bisa mengaksesnya secara langsung.
- useEffect(() => { ... }, []): useEffect digunakan untuk mencetak nilai input ke konsol hanya sekali, saat komponen pertama kali di-mount.
    - console.log(inputRef.current.value): Mengakses current.value dari inputRef untuk mencetak nilai awal dari input.
    - Karena useRef tidak memicu render ulang, pembaruan nilai pada inputRef tidak akan menyebabkan komponen dirender ulang.
### Kegunaan useRef
useRef tidak memicu render ulang komponen saat diperbarui, sehingga ideal untuk menyimpan nilai atau referensi elemen DOM yang tidak perlu diperbarui secara visual.
Contoh penggunaan lainnya termasuk menyimpan timer, mengakses elemen DOM untuk fokus otomatis, atau menyimpan nilai dari render sebelumnya.
### Kesimpulan
useRef sangat berguna untuk mengakses elemen DOM langsung di React, seperti dalam contoh di atas di mana kita mengakses elemen input. Menggunakan useRef untuk mengakses atau menyimpan referensi tidak akan menyebabkan render ulang komponen saat referensi tersebut diperbarui, sehingga memungkinkan akses yang efisien ke elemen DOM atau nilai yang tidak berubah antar render.

# React Hook: useMemo

`useMemo` adalah Hook di React yang memungkinkan kita untuk mengoptimalkan performa dengan melakukan *memoization*. Ini berguna ketika kita memiliki perhitungan yang mahal atau kompleks yang seharusnya tidak dilakukan setiap kali komponen dirender, tetapi hanya ketika nilai tertentu berubah.

## Contoh Penggunaan `useMemo` untuk Mengoptimalkan Komputasi Mahal

Dalam contoh ini, kita menggunakan `useMemo` untuk mengoptimalkan perhitungan `expensiveComputation`, yang hanya dihitung ulang ketika `number` berubah.

### Kode

```javascript
import React, { useState, useMemo } from "react";

export default function App() {
  // Mengelola state untuk angka (number) dan penambah (incrementor)
  const [number, setNumber] = useState(0);
  const [incrementor, setIncrementor] = useState(1);

  // Menggunakan useMemo untuk melakukan komputasi yang mahal hanya saat 'number' berubah
  const expensiveComputation = useMemo(() => {
    console.log("Computing...");
    return number * 2;
  }, [number]);

  return (
    <div>
      <h1>useMemo Example</h1>
      <p>Number: {number}</p>
      <p>Computed Value: {expensiveComputation}</p>
      <button onClick={() => setNumber(number + incrementor)}>Increment</button>
      <button onClick={() => setIncrementor(incrementor + 1)}>
        Increase Incrementor
      </button>
    </div>
  );
}
```
### Penjelasan
#### useState:
- number: State yang menyimpan angka utama yang akan diperbarui saat tombol "Increment" ditekan.
- incrementor: State yang menyimpan nilai untuk menambah number. Setiap kali "Increase Incrementor" ditekan, nilai ini bertambah satu.
#### useMemo:
- expensiveComputation adalah hasil komputasi yang hanya dihitung ulang ketika number berubah.
- useMemo(() => { ... }, [number]): useMemo menyimpan hasil komputasi number * 2 dan hanya menghitung ulang ketika number berubah. Ini menghindari perhitungan ulang yang tidak perlu pada setiap render.
- console.log("Computing..."): Ini hanya akan tercetak di konsol saat number berubah, menunjukkan bahwa komputasi dilakukan kembali.
#### Fungsi Increment:
- Increment Button: Menambah nilai number dengan nilai incrementor.
- Increase Incrementor Button: Menambah nilai incrementor sebesar 1. Perubahan pada incrementor tidak memicu perhitungan ulang expensiveComputation karena tidak ada dalam array dependensi useMemo.
### Kapan Menggunakan useMemo
- Gunakan useMemo ketika Anda memiliki komputasi mahal yang bergantung pada nilai tertentu, dan Anda ingin menghindari perhitungan ulang yang tidak perlu.
- Ini membantu meningkatkan performa dengan mengurangi beban komputasi pada render yang tidak relevan.
# React Hook: useCallback

`useCallback` adalah Hook di React yang memungkinkan kita untuk membuat fungsi yang di-memoisasi, sehingga fungsi tersebut hanya akan dibuat ulang ketika nilai tertentu berubah. Ini sangat berguna untuk meningkatkan performa ketika kita memiliki fungsi yang dikirim sebagai *props* ke komponen anak atau digunakan dalam efek.

## Contoh Penggunaan `useCallback` untuk Menghindari Pembuatan Ulang Fungsi yang Tidak Diperlukan

Dalam contoh ini, `useCallback` digunakan untuk menghindari pembuatan ulang fungsi `incrementCount` setiap kali komponen `ClickCounter` dirender.

### Kode

```javascript
import React, { useState, useCallback } from "react";

function ClickCounter() {
  const [count, setCount] = useState(0);

  // Fungsi incrementCount di-memoisasi menggunakan useCallback
  const incrementCount = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <h1>Click Count: {count}</h1>
      <button onClick={incrementCount}>Click Me!</button>
    </div>
  );
}

export default ClickCounter;
```
## Penjelasan
#### useState:
- count: State yang menyimpan jumlah klik, diperbarui setiap kali tombol diklik.
- setCount: Fungsi untuk memperbarui nilai count.
#### useCallback:
- incrementCount adalah fungsi yang di-memoisasi menggunakan useCallback. Ini berarti bahwa fungsi incrementCount hanya dibuat satu kali saat komponen di-mount.
- useCallback(() => { ... }, []): Array dependency kosong [] menunjukkan bahwa incrementCount tidak akan dibuat ulang karena tidak bergantung pada nilai apa pun yang mungkin berubah.
- Manfaat: Menggunakan useCallback mencegah fungsi incrementCount dibuat ulang setiap kali komponen dirender, yang dapat meningkatkan performa, terutama saat fungsi tersebut dikirim sebagai props ke komponen lain.
#### Button Click:
- Tombol "Click Me!" memanggil incrementCount, yang menambah nilai count sebesar 1 setiap kali tombol diklik.
### Kapan Menggunakan useCallback
- useCallback sangat berguna ketika Anda memiliki fungsi yang tidak perlu diubah pada setiap render, terutama saat fungsi tersebut digunakan sebagai props pada komponen anak atau digunakan dalam efek yang hanya perlu dijalankan sekali.
- Menggunakan useCallback dapat menghemat penggunaan memori dan waktu komputasi dengan menghindari pembuatan ulang fungsi yang tidak perlu.
### Kesimpulan
useCallback adalah cara yang efektif untuk mengoptimalkan performa aplikasi React dengan menghindari pembuatan ulang fungsi yang tidak perlu pada setiap render. Dalam contoh di atas:
- Fungsi incrementCount di-memoisasi dan hanya dibuat sekali, sehingga tidak menyebabkan komponen ClickCounter mengalami render yang tidak perlu.
- useCallback memastikan bahwa incrementCount hanya akan berubah jika dependensi dalam array (jika ada) berubah.

# Custom Hook: useForm

`useForm` adalah custom hook yang memungkinkan kita untuk mengelola state dari form secara efisien di React. Dengan menggunakan `useForm`, kita dapat dengan mudah mengatur nilai input dan mengelola perubahan tanpa menulis banyak kode boilerplate.

## Pembuatan Custom Hook: `useForm`

Hook ini dibuat untuk menerima objek `initialValues` yang berisi nilai awal dari form. Hook ini mengembalikan *state* `values` yang menyimpan nilai input dan fungsi `handleChange` untuk memperbarui nilai tersebut.

### Kode

```javascript
import { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return [values, handleChange];
};

export default useForm;
```
### Penjelasan
1. useState(initialValues): useForm menggunakan useState untuk membuat state values, yang diinisialisasi dengan initialValues yang diterima sebagai argumen.
2. handleChange:
- Fungsi ini menangani perubahan input. Ketika pengguna mengetik sesuatu pada input form, fungsi ini dipanggil untuk memperbarui nilai values.
- const { name, value } = event.target; mengambil atribut name dan value dari elemen input.
- setValues({ ...values, [name]: value }): Menggunakan spread operator untuk mempertahankan nilai-nilai lain dalam values dan memperbarui hanya elemen yang diubah.
3. Return Value: useForm mengembalikan array [values, handleChange], di mana values adalah state form dan handleChange adalah fungsi untuk memperbarui nilai form.

### Contoh Penggunaan useForm dalam Komponen Form: FormComponent
Komponen FormComponent menggunakan useForm untuk mengelola input form sederhana dengan satu kolom username.
```javascript
import React from "react";
import useForm from "./utils/hooks/useForm";

export default function FormComponent() {
  const [formValues, handleInputChange] = useForm({
    username: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted:", formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```
### Penjelasan
1. useForm Hook:
- const [formValues, handleInputChange] = useForm({ username: "" });
- Menginisialisasi formValues dengan { username: "" } sebagai nilai awal, dan handleInputChange sebagai fungsi untuk menangani perubahan input.
2. handleSubmit:
- Fungsi ini dipanggil saat form disubmit. event.preventDefault() digunakan untuk mencegah perilaku default dari form submit.
- console.log("Form Submitted:", formValues); menampilkan nilai formValues saat form disubmit.
3. Input Field:
- `<input type="text" name="username" value={formValues.username} onChange={handleInputChange} />`
- Input ini terhubung ke formValues.username dan diperbarui menggunakan handleInputChange setiap kali pengguna mengetik.
### Kegunaan useForm
Custom hook useForm berguna untuk mengelola form dengan lebih mudah dan efisien di React. Dengan useForm, kita dapat menangani perubahan form secara dinamis dan mengelola state dari beberapa input tanpa perlu mengulang logika handleChange untuk setiap input.

### Kesimpulan
Custom hook useForm memungkinkan pengelolaan form yang lebih sederhana dengan menggunakan useState untuk menyimpan nilai input dan handleChange untuk memperbarui nilai input. Dalam contoh FormComponent, useForm mengelola input form username dan memungkinkan pengiriman data form dengan mudah.