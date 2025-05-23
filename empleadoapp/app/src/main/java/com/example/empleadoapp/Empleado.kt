package com.example.empleadoapp
import android.os.Parcel
import android.os.Parcelable
    data class Empleado(val usuario: String, val contrasena: String, val uriImagen: String?) : Parcelable {
        constructor(parcel: Parcel) : this(parcel.readString() ?: "", parcel.readString() ?: "", parcel.readString())
        override fun writeToParcel(parcel: Parcel, flags: Int) {
            parcel.writeString(usuario)
            parcel.writeString(contrasena)
            parcel.writeString(uriImagen)
        }
        override fun describeContents() = 0
        companion object CREATOR : Parcelable.Creator<Empleado> {
            override fun createFromParcel(parcel: Parcel) = Empleado(parcel)
            override fun newArray(size: Int) = arrayOfNulls<Empleado?>(size)
        }
    }

