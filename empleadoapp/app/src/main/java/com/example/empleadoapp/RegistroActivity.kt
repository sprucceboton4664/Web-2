package com.example.empleadoapp

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.view.Menu
import android.view.MenuItem
import android.widget.*
import androidx.activity.ComponentActivity
import androidx.appcompat.app.AppCompatActivity
import kotlin.isInitialized
import kotlin.jvm.java

class RegistroActivity : AppCompatActivity() {
    private lateinit var imgEmpleado: ImageView
    private lateinit var uriImagen: Uri
    private val PICK_IMAGE = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_registro)

        imgEmpleado = findViewById(R.id.imgEmpleado)
        val btnRegistrar = findViewById<Button>(R.id.btnRegistrar)

        imgEmpleado.setOnClickListener {
            val intent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
          startActivityForResult(intent, PICK_IMAGE)
        }

        btnRegistrar.setOnClickListener {
            val usuario = findViewById<EditText>(R.id.txtUsuario).text.toString()
            val pass = findViewById<EditText>(R.id.txtContrasena).text.toString()

            if (!::uriImagen.isInitialized) {
                Toast.makeText(this, "Debe cargar una imagen", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val empleado = Empleado(usuario, pass, uriImagen.toString())
            val intent = Intent(this, LoginActivity::class.java)
            intent.putExtra("empleado", empleado)
            startActivity(intent)
            Toast.makeText(this, "Empleado registrado", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == PICK_IMAGE && resultCode == RESULT_OK) {
            uriImagen = data?.data!!
            imgEmpleado.setImageURI(uriImagen)
        }
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.menu_registro, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.menu_inicio -> {
                startActivity(Intent(this, MainActivity::class.java))
                true
            }
            R.id.menu_login -> {
                startActivity(Intent(this, LoginActivity::class.java))
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }
}
