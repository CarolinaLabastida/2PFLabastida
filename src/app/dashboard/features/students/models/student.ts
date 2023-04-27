export interface Student{
    id: number,
    name: string,
    lastName: string,
    email:string,
    phone: string,
    birthDate: Date,
    gender:string
  }

  export interface FormDataStudent{
    name: string,
    lastName: string,
    email:string,
    phone: string,
    birthDate: Date,
    gender:string
  }

const students: Student[] = [
    {
      id: 1,
      name: 'Josué Alonso',
      lastName: 'Camacho Montijo',
      email: 'jcamacho@gmail.com',
      phone: '8338925678',
      birthDate: new Date('2000-02-15'),
      gender: 'M'
    },
    {
      id: 2,
      name: 'Nancy',
      lastName: 'Ruíz Domínguez',
      email: 'NRuiz_dom@hotmail.com',
      phone: '2417895648',
      birthDate: new Date('2001-01-03'),
      gender: 'F'
    },
    {
      id: 3,
      name: 'Oscar Manuel',
      lastName: 'Mendoza Rosas',
      email: 'oscar.mendoza@gmail.com',
      phone: '8331456789',
      birthDate: new Date('1999-02-15'),
      gender: 'M'
    },
    {
      id: 4,
      name: 'Laura Andrea',
      lastName: 'Almanza García',
      email: 'lalmanza23@hotmail.com',
      phone: '8336728907',
      birthDate: new Date('1977-06-02'),
      gender: 'F'
    },
    {
      id: 5,
      name: 'Fernanda',
      lastName: 'Velázquez Tovar',
      email: 'v.Fernanda@gmail.com',
      phone: '7246893789',
      birthDate: new Date('2000-03-03'),
      gender: 'F'
    }
  ]

export default students; 
  
 