a = float(input("Masukkan panjang sisi a: "))
b = float(input("Masukkan panjang sisi b: "))
c = float(input("Masukkan panjang sisi c: "))

if a + b > c and a + c > b and b + c > a:
    print("Segitiga valid")

    if a == b and b == c:
        jenis = "Segitiga sama sisi"
    elif a == b or a == c or b == c:
        jenis = "Segitiga sama kaki"
    else:
        jenis = "Segitiga sembarang"

    print("Jenis sisi:", jenis)
    if a >= b and a >= c:
        sisi_terpanjang = a
        sisi1 = b
        sisi2 = c
    elif b >= a and b >= c:
        sisi_terpanjang = b
        sisi1 = a
        sisi2 = c
    else:
        sisi_terpanjang = c
        sisi1 = a
        sisi2 = b

    if sisi1 ** 2 + sisi2 ** 2 == sisi_terpanjang ** 2:
        print("Sifat: Segitiga siku-siku")
    else:
        print("Sifat: Bukan segitiga siku-siku")
else:
    print("Ketiga sisi tidak dapat membentuk segitiga")