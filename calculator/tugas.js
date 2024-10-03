const readline = require("readline-sync");

let history = [];
let angkaPertama;

while (true) {
  if (!angkaPertama) {
    angkaPertama = readline.question("Masukkan Angka Pertama : ");
    while (angkaPertama === "" || isNaN(angkaPertama)) {
      console.log("Harus Memasukkan Angka, silakan coba lagi");
      angkaPertama = readline.question("Masukkan Angka Pertama : ");
    }
    angkaPertama = parseFloat(angkaPertama);
  }

  const operator = readline.question("Pilih Operator (+ , - , * , / , %) : ");
  let angkaKedua = readline.question("Masukkan Angka Kedua : ");
  while (angkaKedua === "" || isNaN(angkaKedua)) {
    console.log("Harus Memasukkan Angka, silakan coba lagi");
    angkaKedua = readline.question("Masukkan Angka Kedua : ");
  }
  angkaKedua = parseFloat(angkaKedua);

  const requireOperaror = ["+", "-", "*", "/", "%"];

  if (!requireOperaror.includes(operator)) {
    console.log("pilih sesuatu operator yang tersedia");
  } else {
    while (operator === "/" && angkaKedua === 0) {
      console.log("Angka kedua tidak boleh 0");
      angkaKedua = readline.question("Masukkan Angka Kedua : ");
      while (angkaKedua === "" || isNaN(angkaKedua)) {
        console.log("Harus Memasukkan Angka, silakan coba lagi");
        angkaKedua = readline.question("Masukkan Angka Kedua : ");
      }
      angkaKedua = parseFloat(angkaKedua);
    }

    const hasil = proccesHasil(angkaPertama, angkaKedua, operator);
    if (isNaN(hasil)) {
      console.log("Hasil tidak dapat dihitung");
    } else {
      console.log({ hasil });
      history.push({ angkaPertama, angkaKedua, operator, hasil });
      angkaPertama = hasil;
    }

    const response = readline.question(
      "Apakah Anda ingin melanjutkan perhitungan? (y/n) : "
    );
    if (response.toLowerCase() === "y") {
      angkaPertama = null; // Reset angkaPertama to null
      continue; // Go back to the main calculation loop
    } else {
      const command = readline.question(
        "Masukkan perintah (riwayat, keluar) : "
      );
      if (command.toLowerCase() === "riwayat") {
        while (true) {
          printHistory();
          const response = readline.question(
            "Apakah Anda ingin kembali? (y/n) : "
          );
          if (response.toLowerCase() === "y") {
            angkaPertama = null; // Reset angkaPertama to null
            break; // Go back to the main calculation loop
          } else {
            // Stay in the history view
            continue;
          }
        }
      } else if (command.toLowerCase() === "keluar") {
        break;
      }
    }
  }
}

function proccesHasil(inputanPertama, inputanKedua, operator) {
  switch (operator) {
    case "+":
      return inputanPertama + inputanKedua;
    case "-":
      return inputanPertama - inputanKedua;
    case "*":
      return inputanPertama * inputanKedua;
    case "/":
      return inputanPertama / inputanKedua;
    case "%":
      return inputanPertama % inputanKedua;
  }
}

function printHistory() {
  console.log("Riwayat Kalkulasi:");
  history.forEach((item, index) => {
    console.log(
      `#${index + 1}: ${item.angkaPertama} ${item.operator} ${
        item.angkaKedua
      } = ${item.hasil}`
    );
  });
}
