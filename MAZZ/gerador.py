import os
from PIL import Image, ImageDraw, ImageFont
import qrcode

class GeradorCertificadoMazz:
    def __init__(self, template="4.jpg", logo="022.png", assinatura="Marcio.png"):
        self.template = template
        self.logo = logo
        self.assinatura = assinatura

    def gerar(self, nome_aluno, curso, carga, data):
        if not os.path.exists(self.template):
            print(f"Erro: Arquivo {self.template} não encontrado!")
            return
            
        # 1. Preparar fundo em Alta Resolução (A4 300 DPI)
        img_original = Image.open(self.template).convert("RGB")
        img = img_original.resize((3508, 2480), Image.Resampling.LANCZOS)
        draw = ImageDraw.Draw(img)
        largura, altura = img.size

        # 2. Logo MAZZ Centralizada no Topo
        if os.path.exists(self.logo):
            logo_img = Image.open(self.logo)
            base_w = 750 # Tamanho de destaque para a logo
            w_percent = (base_w / float(logo_img.size[0]))
            h_size = int((float(logo_img.size[1]) * float(w_percent)))
            logo_img = logo_img.resize((base_w, h_size), Image.Resampling.LANCZOS)
            # Cola a logo centralizada no topo (y=220)
            img.paste(logo_img, ((largura - base_w) // 2, 220), logo_img if logo_img.mode == 'RGBA' else None)

        # 3. Configurar Fontes
        try:
            f_titulo = ImageFont.truetype("arialbd.ttf", 100)
            f_nome = ImageFont.truetype("arialbd.ttf", 160)
            f_texto = ImageFont.truetype("arial.ttf", 75)
            f_assinatura = ImageFont.truetype("arial.ttf", 55)
        except:
            f_titulo = f_nome = f_texto = f_assinatura = ImageFont.load_default()

        # 4. Textos (Alinhados ao centro)
        cor_verde_escuro = (0, 70, 0)
        
        draw.text((largura/2, 850), "CERTIFICADO DE CONCLUSÃO", font=f_titulo, fill=cor_verde_escuro, anchor="mm")
        draw.text((largura/2, 1100), "Certificamos que o(a) aluno(a)", font=f_texto, fill=(60, 60, 60), anchor="mm")
        draw.text((largura/2, 1300), nome_aluno.upper(), font=f_nome, fill=(0, 0, 0), anchor="mm")
        draw.text((largura/2, 1550), f"concluiu com êxito o treinamento de {curso}", font=f_texto, fill=(60, 60, 60), anchor="mm")
        draw.text((largura/2, 1750), f"Carga Horária: {carga} horas  |  Data: {data}", font=f_texto, fill=(80, 80, 80), anchor="mm")

        # 5. Assinatura "Marcio.png" Centralizada no Rodapé
        if os.path.exists(self.assinatura):
            assin_img = Image.open(self.assinatura)
            assin_w = 800 # Largura da assinatura
            w_per = (assin_w / float(assin_img.size[0]))
            assin_h = int((float(assin_img.size[1]) * float(w_per)))
            assin_img = assin_img.resize((assin_w, assin_h), Image.Resampling.LANCZOS)
            
            # Posicionamento da assinatura e linha
            pos_y_base = altura - 600
            img.paste(assin_img, ((largura - assin_w) // 2, pos_y_base - 100), assin_img if assin_img.mode == 'RGBA' else None)
            
            draw.text((largura/2, pos_y_base + 50), "_________________________________", font=f_assinatura, fill=(0,0,0), anchor="mm")
            draw.text((largura/2, pos_y_base + 120), "Márcio Rodrigues de Oliveira - Diretor", font=f_assinatura, fill=(0,0,0), anchor="mm")

        # 6. QR Code de Autenticação (Canto inferior direito)
        qr = qrcode.make(f"https://mazzcursos.com.br/validar/{nome_aluno.split()[0]}")
        qr_size = 320
        qr_img = qr.resize((qr_size, qr_size)).convert("RGB")
        img.paste(qr_img, (largura - qr_size - 220, altura - qr_size - 220))

        # 7. Salvar PDF Final
        nome_pdf = f"Certificado_{nome_aluno.split()[0]}.pdf"
        img.save(nome_pdf, "PDF", resolution=300.0)
        print(f"---")
        print(f"✅ CERTIFICADO COMPLETO GERADO: {nome_pdf}")
        print(f"---")

if __name__ == "__main__":
    app = GeradorCertificadoMazz()
    app.gerar("MÁRCIO RODRIGUES DE OLIVEIRA", "DESENVOLVIMENTO PYTHON", "40", "07/03/2026")