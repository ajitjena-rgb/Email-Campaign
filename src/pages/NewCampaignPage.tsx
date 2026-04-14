import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Icon,
} from '@chakra-ui/react';
import {
  Button,
  IconButton,
  SearchInput,
  Stepper,
  Menu,
  MenuItem,
  Avatar,
  ArrowBack,
  ChevronRight,
  Plus,
  Download,
  ImportXlsx,
  Info,
  More,
  Attention,
  SMSCampaign,
  Users,
} from '@radiant/common/ui';

// ─── Types ───────────────────────────────────────────────────────────────────

type Recipient = {
  id: number;
  name: string;
  email: string;
  mobileWarning: boolean;
  balance: string;
  language: string;
};

// ─── Constants ───────────────────────────────────────────────────────────────

const STEPS = [
  'Select Recipient',
  'Compose Your Message',
  'Define your Send Options',
  'Review and Send',
];

const MOCK_RECIPIENTS: Recipient[] = [
  {
    id: 1,
    name: 'Michel Jamati',
    email: 'michel@lexop.com',
    mobileWarning: true,
    balance: '$2617.00',
    language: 'EN',
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function NewCampaignPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [search, setSearch] = useState('');

  const filtered = MOCK_RECIPIENTS.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  return (
    <Flex direction="column" h="100vh" bg="white" overflow="hidden">
      {/* ── Top bar (breadcrumb row) ── */}
      <Flex
        align="center"
        justify="space-between"
        px={6}
        h="48px"
        bg="white"
        borderBottom="1px solid"
        borderColor="#DDDFE4"
        flexShrink={0}
      >
        <Text color="#11304F" fontSize="14px">
          Campaigns
        </Text>
        <Avatar id="top-user" name="Admin User" size="sm" />
      </Flex>

      {/* ── Header (icon + breadcrumb + Next button) ── */}
      <Flex
        align="center"
        justify="space-between"
        px={6}
        h="64px"
        bg="white"
        borderBottom="1px solid"
        borderColor="#DDDFE4"
        flexShrink={0}
      >
        {/* Left: back icon + campaign icon + breadcrumb */}
        <HStack spacing={3}>
          <IconButton
            icon={ArrowBack}
            variant="minimal"
            aria-label="Go back"
            size="sm"
            onClick={() => navigate('/')}
          />
          <Icon as={SMSCampaign} fontSize="22px" color="#11304F" />
          <Text fontWeight="bold" fontSize="18px" color="#11304F">
            Campaigns
          </Text>

          {/* Breadcrumb */}
          <HStack spacing={2}>
            <Icon as={ChevronRight} fontSize="16px" color="#6F7489" />
            <Text
              fontSize="14px"
              color="#6F7489"
              cursor="pointer"
              onClick={() => navigate('/')}
              _hover={{ color: '#11304F' }}
            >
              Index
            </Text>
            <Icon as={ChevronRight} fontSize="16px" color="#6F7489" />
            <Text fontSize="14px" color="#11304F" fontWeight="medium">
              New Campaign
            </Text>
            <Icon as={ChevronRight} fontSize="16px" color="#6F7489" />
            <Text fontSize="14px" color="#6F7489">
              {STEPS[currentStep]}
            </Text>
          </HStack>
        </HStack>

        {/* Right: Next button */}
        <Button
          label="Next"
          variant="primary"
          size="md"
          borderRadius="16px"
          bg="#48B5B5"
          _hover={{ bg: '#3DA3A3' }}
          color="white"
          minW="100px"
          onClick={handleNext}
          disabled={currentStep === STEPS.length - 1}
        />
      </Flex>

      {/* ── Body (stepper sidebar + content) ── */}
      <Flex flex={1} overflow="hidden">
        {/* Stepper sidebar */}
        <Box
          w="160px"
          flexShrink={0}
          borderRight="1px solid"
          borderColor="#DDDFE4"
          pt={8}
          px={4}
          bg="white"
          overflowY="auto"
        >
          <Stepper
            stepTitleList={STEPS}
            currentStepIndex={currentStep}
            type="default"
            allowOfsset
            onChange={setCurrentStep}
          />
        </Box>

        {/* Main content */}
        <Box flex={1} overflowY="auto" px={8} pt={8} bg="white">
          {currentStep === 0 && (
            <SelectRecipientsStep
              search={search}
              onSearch={setSearch}
              recipients={filtered}
            />
          )}
          {currentStep === 1 && <StepPlaceholder title="Compose Your Message" />}
          {currentStep === 2 && <StepPlaceholder title="Define your Send Options" />}
          {currentStep === 3 && <StepPlaceholder title="Review and Send" />}
        </Box>
      </Flex>
    </Flex>
  );
}

// ─── Step 1: Select Recipients ────────────────────────────────────────────────

type SelectRecipientsStepProps = {
  search: string;
  onSearch: (v: string) => void;
  recipients: Recipient[];
};

function SelectRecipientsStep({
  search,
  onSearch,
  recipients,
}: SelectRecipientsStepProps) {
  return (
    <Box>
      {/* Title */}
      <Text fontSize="20px" fontWeight="semibold" color="#11304F" mb={2}>
        Select the recipients for this message
      </Text>
      <Divider borderColor="#11304F" mb={6} />

      {/* Toolbar */}
      <Flex justify="space-between" align="center" mb={6}>
        {/* Search */}
        <Box w="358px">
          <SearchInput
            placeholder="Search recipients"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onSearch(e.target.value)
            }
          />
        </Box>

        <HStack spacing={3}>
          {/* Action buttons */}
          <Button
            label="New"
            variant="secondary"
            icon={Users}
            iconPos="left"
            size="sm"
            borderRadius="8px"
          />
          <Button
            label="Import"
            variant="secondary"
            icon={ImportXlsx}
            iconPos="left"
            size="sm"
            borderRadius="8px"
          />
          <Button
            label="Download template"
            variant="secondary"
            icon={Download}
            iconPos="left"
            size="sm"
            borderRadius="8px"
          />

          {/* Stats card */}
          <Flex
            border="1px solid"
            borderColor="#DDDFE4"
            borderRadius="8px"
            overflow="hidden"
          >
            <HStack
              px={3}
              py={2}
              spacing={2}
              borderRight="1px solid"
              borderColor="#DDDFE4"
            >
              <Icon as={Plus} fontSize="14px" color="#11304F" />
              <Text fontSize="14px" color="#11304F" fontWeight="medium">
                {recipients.length}
              </Text>
            </HStack>
            <HStack px={3} py={2} spacing={2}>
              <Icon as={Users} fontSize="14px" color="#6F7489" />
              <Text fontSize="14px" color="#6F7489">
                {recipients.length}
              </Text>
            </HStack>
          </Flex>
        </HStack>
      </Flex>

      {/* Recipients Table */}
      <Table variant="simple" size="md">
        <Thead>
          <Tr borderBottom="1px solid" borderColor="#E6E8EB">
            <Th
              fontFamily="sans-serif"
              fontWeight="bold"
              color="#6F7489"
              fontSize="14px"
              textTransform="none"
              letterSpacing="normal"
              pl={0}
            >
              Name
            </Th>
            <Th
              fontFamily="sans-serif"
              fontWeight="bold"
              color="#6F7489"
              fontSize="14px"
              textTransform="none"
              letterSpacing="normal"
            >
              Email
            </Th>
            <Th
              fontFamily="sans-serif"
              fontWeight="bold"
              color="#6F7489"
              fontSize="14px"
              textTransform="none"
              letterSpacing="normal"
            >
              <HStack spacing={1}>
                <Text>Mobile</Text>
                <Icon as={Info} fontSize="16px" color="#6F7489" />
              </HStack>
            </Th>
            <Th
              fontFamily="sans-serif"
              fontWeight="bold"
              color="#6F7489"
              fontSize="14px"
              textTransform="none"
              letterSpacing="normal"
            >
              Balance
            </Th>
            <Th
              fontFamily="sans-serif"
              fontWeight="bold"
              color="#6F7489"
              fontSize="14px"
              textTransform="none"
              letterSpacing="normal"
            >
              Language
            </Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {recipients.map((r) => (
            <Tr
              key={r.id}
              borderBottom="1px solid"
              borderColor="#F4F6F8"
              _hover={{ bg: 'gray.50' }}
            >
              <Td pl={0} color="#11304F" fontSize="16px" fontWeight="bold">
                {r.name}
              </Td>
              <Td color="#11304F" fontSize="16px">
                {r.email}
              </Td>
              <Td>
                {r.mobileWarning ? (
                  <HStack spacing={1}>
                    <Icon as={Attention} fontSize="16px" color="orange.400" />
                    <Text
                      fontSize="14px"
                      color="#48B5B5"
                      textDecoration="underline"
                      cursor="pointer"
                    >
                      Edit
                    </Text>
                  </HStack>
                ) : (
                  <Text fontSize="16px" color="#11304F">
                    —
                  </Text>
                )}
              </Td>
              <Td color="#11304F" fontSize="16px">
                {r.balance}
              </Td>
              <Td color="#11304F" fontSize="16px">
                {r.language}
              </Td>
              <Td>
                <Menu
                  menuButton={
                    <IconButton
                      icon={More}
                      variant="minimal"
                      aria-label="More options"
                      size="sm"
                    />
                  }
                >
                  <MenuItem title="Edit" onSelect={() => {}} />
                  <MenuItem title="Remove" danger onSelect={() => {}} />
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

// ─── Placeholder for other steps ─────────────────────────────────────────────

function StepPlaceholder({ title }: { title: string }) {
  return (
    <Box>
      <Text fontSize="20px" fontWeight="semibold" color="#11304F" mb={2}>
        {title}
      </Text>
      <Divider borderColor="#11304F" mb={6} />
      <Text color="#6F7489" fontSize="16px">
        This step is coming soon.
      </Text>
    </Box>
  );
}

export default NewCampaignPage;
