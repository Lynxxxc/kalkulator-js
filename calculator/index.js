const readline = require("readline-sync");

let history = [];
let angkaPertama;

while (true) {
  if (!angkaPertama) {
    angkaPertama = parseFloat(readline.question("Masukkan Angka Pertama : "));
  }

  const operator = readline.question("Pilih Operator (+ , - , * , / , %) : ");
  const angkaKedua = parseFloat(readline.question("Masukkan Angka Kedua : "));

  const requireOperaror = ["+", "-", "*", "/", "%"];

  if (isNaN(angkaPertama) || isNaN(angkaKedua)) {
    console.log("Inputan harus angka");
  } else if (!requireOperaror.includes(operator)) {
    console.log("pilih sesuatu operator yang tersedia");
  } else {
    const hasil = proccesHasil(angkaPertama, angkaKedua, operator);
    console.log({ hasil });
    history.push({ angkaPertama, angkaKedua, operator, hasil });
    angkaPertama = hasil;

    const response = readline.question(
      "Apakah Anda ingin Mencoba Lagi? (y/n) : "
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
      if (inputanKedua === 0) {
        console.log("Angka kedua tidak boleh 0");
        return null;
      }
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
