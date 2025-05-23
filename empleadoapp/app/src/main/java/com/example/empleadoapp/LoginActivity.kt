package com.example.empleadoapp
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity

class LoginActivity : AppCompatActivity() {
    private lateinit var empleado: Empleado

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        empleado = intent.getParcelableExtra("empleado")!!

        val imgPerfil = findViewById<ImageView>(R.id.imgPerfil)
        val txtUsuario = findViewById<EditText>(R.id.txtUsuario)
        val txtContra = findViewById<EditText>(R.id.txtContrasena)
        val btnLogin = findViewById<Button>(R.id.btnLogin)

        imgPerfil.setImageURI(Uri.parse(empleado.uriImagen))

        btnLogin.setOnClickListener {
            if (txtUsuario.text.toString() == empleado.usuario &&
                txtContra.text.toString() == empleado.contrasena) {
                Toast.makeText(this, "Login exitoso", Toast.LENGTH_SHORT).show()
                startActivity(Intent(this, MensajeActivity::class.java))
            } else {
                Toast.makeText(this, "Credenciales incorrectas", Toast.LENGTH_SHORT).show()
            }
        }
    }
}

