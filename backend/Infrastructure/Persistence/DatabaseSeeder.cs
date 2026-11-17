namespace Infrastructure.Persistence;

using Domain.Entities;
using Domain.Enums;

public static class DatabaseSeeder
{
    public static void Seed(AppDbContext dbContext)
    {
        if (dbContext.Registrations.Any())
        {
            return;
        }

        // Use dates in the past so newly created test registrations (TC-01 to TC-05) will sort newest first at the top
        var baseDate = DateTime.UtcNow.AddDays(-10);

        var registrations = new List<Registration>
        {
            // 1. Juan Dela Cruz - Competitor, Confirmed, Partial (1000 of 2500)
            new()
            {
                Id = Guid.Parse("3f2c9a1e-8765-4321-ba98-fedcba098765"),
                RegistrationNumber = "CS27-0001",
                RegistrationDate = baseDate.AddMinutes(1),
                ParticipantName = "Juan Dela Cruz",
                ContactNumber = "09171234567",
                Email = "juan@example.com",
                Address = "123 Rizal St., Naga City",
                CarMakeModel = "Toyota Supra MK4",
                PlateNumber = "ABC 1234",
                RegistrationType = RegistrationType.Competitor,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 2500.00m,
                AmountPaid = 1000.00m
            },
            // Confirmed (9 more to make 10 Confirmed)
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111002"),
                RegistrationNumber = "CS27-0002",
                RegistrationDate = baseDate.AddMinutes(2),
                ParticipantName = "Maria Santos",
                ContactNumber = "09181112233",
                Email = "maria.santos@test.com",
                Address = "45 Magsaysay Ave., Sorsogon City",
                CarMakeModel = "Honda Civic Type R",
                PlateNumber = "NCR 2024",
                RegistrationType = RegistrationType.VIP,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 5000.00m,
                AmountPaid = 5000.00m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111003"),
                RegistrationNumber = "CS27-0003",
                RegistrationDate = baseDate.AddMinutes(3),
                ParticipantName = "Carlos Garcia",
                ContactNumber = "09192223344",
                Email = "carlos.garcia@test.com",
                Address = "12 Burgos St., Legazpi City",
                CarMakeModel = "Nissan GT-R R35",
                PlateNumber = "BKL 5678",
                RegistrationType = RegistrationType.VIP,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 5000.00m,
                AmountPaid = 5000.00m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111004"),
                RegistrationNumber = "CS27-0004",
                RegistrationDate = baseDate.AddMinutes(4),
                ParticipantName = "Antonio Luna",
                ContactNumber = "09203334455",
                Email = "antonio.luna@test.com",
                Address = "78 Quezon St., Daraga",
                CarMakeModel = "Ford Mustang GT",
                PlateNumber = "DGA 8901",
                RegistrationType = RegistrationType.VIP,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 5000.00m,
                AmountPaid = 3000.00m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111005"),
                RegistrationNumber = "CS27-0005",
                RegistrationDate = baseDate.AddMinutes(5),
                ParticipantName = "Elena Ramos",
                ContactNumber = "09214445566",
                Email = "elena.ramos@test.com",
                Address = "90 Bonifacio St., Sorsogon City",
                CarMakeModel = "Mazda RX-7 FD",
                PlateNumber = "SOR 3456",
                RegistrationType = RegistrationType.Competitor,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 2500.00m,
                AmountPaid = 2500.00m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111006"),
                RegistrationNumber = "CS27-0006",
                RegistrationDate = baseDate.AddMinutes(6),
                ParticipantName = "Ricardo Dalisay",
                ContactNumber = "09225556677",
                Email = "ricardo.dalisay@test.com",
                Address = "23 Mabini St., Casiguran",
                CarMakeModel = "Subaru WRX STI",
                PlateNumber = "CAS 7890",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 1500.00m,
                AmountPaid = 1500.00m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111007"),
                RegistrationNumber = "CS27-0007",
                RegistrationDate = baseDate.AddMinutes(7),
                ParticipantName = "Sofia Castillo",
                ContactNumber = "09236667788",
                Email = "sofia.castillo@test.com",
                Address = "56 Luna St., Bulan",
                CarMakeModel = "Mitsubishi Lancer Evo IX",
                PlateNumber = "BUL 1234",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 1500.00m,
                AmountPaid = 1500.00m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111008"),
                RegistrationNumber = "CS27-0008",
                RegistrationDate = baseDate.AddMinutes(8),
                ParticipantName = "Gabriel Mendoza",
                ContactNumber = "09247778899",
                Email = "gabriel.mendoza@test.com",
                Address = "34 Del Pilar St., Gubat",
                CarMakeModel = "Porsche 911 GT3",
                PlateNumber = "GBT 4567",
                RegistrationType = RegistrationType.VIP,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 5000.00m,
                AmountPaid = 5000.00m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111009"),
                RegistrationNumber = "CS27-0009",
                RegistrationDate = baseDate.AddMinutes(9),
                ParticipantName = "Beatriz Gomez",
                ContactNumber = "09258889900",
                Email = "beatriz.gomez@test.com",
                Address = "67 Zamora St., Irosin",
                CarMakeModel = "Toyota GR Yaris",
                PlateNumber = "IRO 8901",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 1500.00m,
                AmountPaid = 0m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111010"),
                RegistrationNumber = "CS27-0010",
                RegistrationDate = baseDate.AddMinutes(10),
                ParticipantName = "Fernando Poe",
                ContactNumber = "09269990011",
                Email = "fernando.poe@test.com",
                Address = "89 Lapu-Lapu St., Pilar",
                CarMakeModel = "Chevrolet Corvette C8",
                PlateNumber = "PIL 2345",
                RegistrationType = RegistrationType.VIP,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 5000.00m,
                AmountPaid = 1500.00m
            },

            // CheckedIn (6 items)
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111011"),
                RegistrationNumber = "CS27-0011",
                RegistrationDate = baseDate.AddMinutes(11),
                ParticipantName = "Mateo Rossi",
                ContactNumber = "09270001122",
                Email = "mateo.rossi@test.com",
                Address = "15 Peñaranda St., Legazpi City",
                CarMakeModel = "BMW M3 E46",
                PlateNumber = "LEG 6789",
                RegistrationType = RegistrationType.VIP,
                Status = RegistrationStatus.CheckedIn,
                RegistrationFee = 5000.00m,
                AmountPaid = 5000.00m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111012"),
                RegistrationNumber = "CS27-0012",
                RegistrationDate = baseDate.AddMinutes(12),
                ParticipantName = "Isabella Diaz",
                ContactNumber = "09281112233",
                Email = "isabella.diaz@test.com",
                Address = "42 Taft St., Sorsogon City",
                CarMakeModel = "Audi R8 V10",
                PlateNumber = "SOR 9012",
                RegistrationType = RegistrationType.VIP,
                Status = RegistrationStatus.CheckedIn,
                RegistrationFee = 5000.00m,
                AmountPaid = 5000.00m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111013"),
                RegistrationNumber = "CS27-0013",
                RegistrationDate = baseDate.AddMinutes(13),
                ParticipantName = "Diego Silang",
                ContactNumber = "09292223344",
                Email = "diego.silang@test.com",
                Address = "18 Vinzons St., Daet",
                CarMakeModel = "Nissan Silvia S15",
                PlateNumber = "DAE 3456",
                RegistrationType = RegistrationType.Competitor,
                Status = RegistrationStatus.CheckedIn,
                RegistrationFee = 2500.00m,
                AmountPaid = 2500.00m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111014"),
                RegistrationNumber = "CS27-0014",
                RegistrationDate = baseDate.AddMinutes(14),
                ParticipantName = "Patricia Evangelista",
                ContactNumber = "09303334455",
                Email = "patricia.e@test.com",
                Address = "27 Roxas Ave., Naga City",
                CarMakeModel = "Mazda Miata ND",
                PlateNumber = "NAG 7890",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.CheckedIn,
                RegistrationFee = 1500.00m,
                AmountPaid = 1500.00m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111015"),
                RegistrationNumber = "CS27-0015",
                RegistrationDate = baseDate.AddMinutes(15),
                ParticipantName = "Emilio Aguinaldo",
                ContactNumber = "09314445566",
                Email = "emilio.a@test.com",
                Address = "31 Magallanes St., Sorsogon City",
                CarMakeModel = "Honda S2000",
                PlateNumber = "SOR 1122",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.CheckedIn,
                RegistrationFee = 1500.00m,
                AmountPaid = 1500.00m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111016"),
                RegistrationNumber = "CS27-0016",
                RegistrationDate = baseDate.AddMinutes(16),
                ParticipantName = "Clara Rivera",
                ContactNumber = "09325556677",
                Email = "clara.rivera@test.com",
                Address = "84 Real St., Bacon",
                CarMakeModel = "Toyota Celica GT-Four",
                PlateNumber = "BAC 3344",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.CheckedIn,
                RegistrationFee = 1500.00m,
                AmountPaid = 500.00m
            },

            // Pending (6 items)
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111017"),
                RegistrationNumber = "CS27-0017",
                RegistrationDate = baseDate.AddMinutes(17),
                ParticipantName = "Joaquin Montes",
                ContactNumber = "09336667788",
                Email = "joaquin.m@test.com",
                Address = "55 Baywalk, Sorsogon City",
                CarMakeModel = "Volkswagen Golf R",
                PlateNumber = "SOR 5566",
                RegistrationType = RegistrationType.Competitor,
                Status = RegistrationStatus.Pending,
                RegistrationFee = 2500.00m,
                AmountPaid = 0m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111018"),
                RegistrationNumber = "CS27-0018",
                RegistrationDate = baseDate.AddMinutes(18),
                ParticipantName = "Angelica Panganiban",
                ContactNumber = "09347778899",
                Email = "angelica.p@test.com",
                Address = "92 Cathedral Rd., Legazpi City",
                CarMakeModel = "Hyundai I30 N",
                PlateNumber = "LEG 7788",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.Pending,
                RegistrationFee = 1500.00m,
                AmountPaid = 0m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111019"),
                RegistrationNumber = "CS27-0019",
                RegistrationDate = baseDate.AddMinutes(19),
                ParticipantName = "Lucas Hernandez",
                ContactNumber = "09358889900",
                Email = "lucas.h@test.com",
                Address = "14 Port Rd., Matnog",
                CarMakeModel = "Ford Focus RS",
                PlateNumber = "MAT 9900",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.Pending,
                RegistrationFee = 1500.00m,
                AmountPaid = 0m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111020"),
                RegistrationNumber = "CS27-0020",
                RegistrationDate = baseDate.AddMinutes(20),
                ParticipantName = "Camila Soriano",
                ContactNumber = "09369990011",
                Email = "camila.s@test.com",
                Address = "38 Lake Rd., Bulusan",
                CarMakeModel = "Subaru BRZ",
                PlateNumber = "BUL 2233",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.Pending,
                RegistrationFee = 1500.00m,
                AmountPaid = 0m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111021"),
                RegistrationNumber = "CS27-0021",
                RegistrationDate = baseDate.AddMinutes(21),
                ParticipantName = "Rafael Nadal",
                ContactNumber = "09370001122",
                Email = "rafael.n@test.com",
                Address = "72 Hilltop, Castilla",
                CarMakeModel = "Toyota GR86",
                PlateNumber = "CAS 4455",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.Pending,
                RegistrationFee = 1500.00m,
                AmountPaid = 0m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111022"),
                RegistrationNumber = "CS27-0022",
                RegistrationDate = baseDate.AddMinutes(22),
                ParticipantName = "Valerie Concepcion",
                ContactNumber = "09381112233",
                Email = "valerie.c@test.com",
                Address = "63 Coast Rd., Donsol",
                CarMakeModel = "Dodge Challenger",
                PlateNumber = "DON 6677",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.Pending,
                RegistrationFee = 1500.00m,
                AmountPaid = 0m
            },

            // Cancelled (3 items - fees and payments excluded from summary totals)
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111023"),
                RegistrationNumber = "CS27-0023",
                RegistrationDate = baseDate.AddMinutes(23),
                ParticipantName = "Bernardo Carpio",
                ContactNumber = "09392223344",
                Email = "bernardo.c@test.com",
                Address = "80 Mountain View, Juban",
                CarMakeModel = "Jeep Wrangler Rubicon",
                PlateNumber = "JUB 8899",
                RegistrationType = RegistrationType.Competitor,
                Status = RegistrationStatus.Cancelled,
                RegistrationFee = 2500.00m,
                AmountPaid = 1000.00m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111024"),
                RegistrationNumber = "CS27-0024",
                RegistrationDate = baseDate.AddMinutes(24),
                ParticipantName = "Teresa Magbanua",
                ContactNumber = "09403334455",
                Email = "teresa.m@test.com",
                Address = "19 River Rd., Sta. Magdalena",
                CarMakeModel = "Ford F-150 Raptor",
                PlateNumber = "STM 1010",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.Cancelled,
                RegistrationFee = 1500.00m,
                AmountPaid = 500.00m
            },
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111025"),
                RegistrationNumber = "CS27-0025",
                RegistrationDate = baseDate.AddMinutes(25),
                ParticipantName = "Gregorio Del Pilar",
                ContactNumber = "09414445566",
                Email = "gregorio.p@test.com",
                Address = "47 Fort St., Barcelona",
                CarMakeModel = "Mercedes-AMG C63",
                PlateNumber = "BAR 2020",
                RegistrationType = RegistrationType.VIP,
                Status = RegistrationStatus.Cancelled,
                RegistrationFee = 5000.00m,
                AmountPaid = 2000.00m
            }
        };

        dbContext.Registrations.AddRange(registrations);
        dbContext.SaveChanges();
    }
}
