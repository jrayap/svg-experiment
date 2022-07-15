window.onload = () => {
  const arch = new Arch(50, 3, 100);

  document.getElementById("arch-data").innerText = `${JSON.stringify(arch)}`;
};
